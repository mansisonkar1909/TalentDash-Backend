import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const ALLOWED_LEVELS = ['L3','L4','L5','L6','SDE_I','SDE_II','SDE_III','STAFF','PRINCIPAL','IC4','IC5']
const ALLOWED_CURRENCIES = ['INR','USD','GBP','EUR']

function normalizeCompany(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\b(pvt|ltd|inc|llc|private|limited|technologies|services|india|web|\.com)\b\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function toSlug(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Check required fields
    const requiredFields = ['company', 'role', 'level', 'location', 'currency', 'experience_years', 'base_salary', 'confidence_score', 'source']
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        return NextResponse.json(
          { error: true, field, message: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const { company, role, level, location, currency, experience_years, base_salary, confidence_score, source } = body
    const bonus = body.bonus ?? 0
    const stock = body.stock ?? 0

    // 2. Validate level enum
    if (!ALLOWED_LEVELS.includes(level)) {
      return NextResponse.json(
        { error: true, field: 'level', message: `Level must be one of: ${ALLOWED_LEVELS.join(', ')}` },
        { status: 400 }
      )
    }

    // 3. Validate currency enum
    if (!ALLOWED_CURRENCIES.includes(currency)) {
      return NextResponse.json(
        { error: true, field: 'currency', message: `Currency must be one of: ${ALLOWED_CURRENCIES.join(', ')}` },
        { status: 400 }
      )
    }

    // 4. Validate experience_years
    if (!Number.isInteger(experience_years) || experience_years <= 0 || experience_years >= 51) {
      return NextResponse.json(
        { error: true, field: 'experience_years', message: 'experience_years must be > 0 and < 51' },
        { status: 400 }
      )
    }

    // 5. Validate base_salary
    if (typeof base_salary !== 'number' || base_salary <= 0) {
      return NextResponse.json(
        { error: true, field: 'base_salary', message: 'base_salary must be > 0' },
        { status: 400 }
      )
    }

    // 6. Validate confidence_score
    if (typeof confidence_score !== 'number' || confidence_score < 0.0 || confidence_score > 1.0) {
      return NextResponse.json(
        { error: true, field: 'confidence_score', message: 'confidence_score must be between 0.0 and 1.0' },
        { status: 400 }
      )
    }

    // 7. Normalize company name and find or create
    const normalized = normalizeCompany(company)
    const slug = toSlug(normalized)

    const companyRecord = await prisma.company.upsert({
      where: { slug },
      update: {},
      create: {
        name: company.trim(),
        slug,
        normalized_name: normalized,
      }
    })

    // 8. Recompute total_compensation — NEVER trust client value
    const total_compensation = BigInt(base_salary) + BigInt(bonus) + BigInt(stock)

    // 9. Duplicate check — same company+role+level+location in last 48hrs, base within 10%
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000)
    const recentRecords = await prisma.salary.findMany({
      where: {
        company_id: companyRecord.id,
        role,
        level,
        location,
        submitted_at: { gte: fortyEightHoursAgo }
      }
    })

    const isDuplicate = recentRecords.some(record => {
      const existing = Number(record.base_salary)
      const diff = Math.abs(existing - base_salary)
      return diff <= base_salary * 0.10
    })

    if (isDuplicate) {
      return NextResponse.json(
        { error: true, message: 'Duplicate record detected within 48 hours' },
        { status: 409 }
      )
    }

    // 10. Store the record
    const stored = await prisma.salary.create({
      data: {
        company_id: companyRecord.id,
        role,
        level,
        location,
        currency,
        experience_years,
        base_salary: BigInt(base_salary),
        bonus: BigInt(bonus),
        stock: BigInt(stock),
        total_compensation,
        source,
        confidence_score,
        is_verified: source === 'CONTRIBUTOR',
      }
    })

    return NextResponse.json({
      ...stored,
      base_salary: stored.base_salary.toString(),
      bonus: stored.bonus.toString(),
      stock: stored.stock.toString(),
      total_compensation: stored.total_compensation.toString(),
    }, { status: 201 })

  } catch (error) {
    console.error('Ingest error:', error)
    return NextResponse.json({ error: true, message: 'Internal Server Error' }, { status: 500 })
  }
}