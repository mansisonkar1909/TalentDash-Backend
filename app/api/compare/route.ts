import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const s1 = searchParams.get('s1')
    const s2 = searchParams.get('s2')

    if (!s1 || !s2) {
      return NextResponse.json(
        { error: true, message: 'Missing required query parameters: s1 and s2' },
        { status: 400 }
      )
    }

    // Same ID check
    if (s1 === s2) {
      return NextResponse.json(
        { error: true, message: 'Cannot compare a record with itself. s1 and s2 must be different.' },
        { status: 400 }
      )
    }

    const [record1, record2] = await Promise.all([
      prisma.salary.findUnique({ where: { id: s1 }, include: { company: true } }),
      prisma.salary.findUnique({ where: { id: s2 }, include: { company: true } }),
    ])

    if (!record1 || !record2) {
      const missing = !record1 && !record2 ? 'Both IDs' : !record1 ? `s1 (${s1})` : `s2 (${s2})`
      return NextResponse.json(
        { error: true, message: `${missing} not found` },
        { status: 404 }
      )
    }

    // Serialize BigInts before returning

    type SalaryWithCompany = Prisma.SalaryGetPayload<{
  include: { company: true }
    }>
    const serialize = (r: SalaryWithCompany) => {
      return ({
        ...r,
        base_salary: r.base_salary.toString(),
        bonus: r.bonus.toString(),
        stock: r.stock.toString(),
        total_compensation: r.total_compensation.toString(),
      })
    }

    const delta = {
      base_delta:       (record1.base_salary - record2.base_salary).toString(),
      bonus_delta:      (record1.bonus - record2.bonus).toString(),
      stock_delta:      (record1.stock - record2.stock).toString(),
      tc_delta:         (record1.total_compensation - record2.total_compensation).toString(),
      experience_delta: record1.experience_years - record2.experience_years,
    }

    return NextResponse.json({
      record1: serialize(record1),
      record2: serialize(record2),
      delta,
    })

  } catch (error) {
    console.error('Compare error:', error)
    return NextResponse.json({ error: true, message: 'Internal Server Error' }, { status: 500 })
  }
}