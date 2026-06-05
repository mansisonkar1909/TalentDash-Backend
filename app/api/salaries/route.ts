import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Pagination
    let page = parseInt(searchParams.get('page') || '1')
    let limit = parseInt(searchParams.get('limit') || '25')
    if (isNaN(page) || page < 1) page = 1
    if (isNaN(limit) || limit < 1) limit = 25
    if (limit > 100) limit = 100  // hard cap
    const skip = (page - 1) * limit

    // Filters
    const company  = searchParams.get('company')
    const role     = searchParams.get('role')
    const level    = searchParams.get('level')
    const location = searchParams.get('location')
    const currency = searchParams.get('currency')
    const sort     = searchParams.get('sort') || 'total_comp_desc'

    // Build where clause
    const where: any = {}
    if (company)  where.company  = { normalized_name: { contains: company.toLowerCase(), mode: 'insensitive' } }
    if (role)     where.role     = { contains: role, mode: 'insensitive' }
    if (level)    where.level    = level
    if (location) where.location = { contains: location, mode: 'insensitive' }
    if (currency) where.currency = currency

    // Sort order
    const orderBy =
      sort === 'total_comp_asc' ? { total_compensation: 'asc' as const } :
      sort === 'date_desc'      ? { submitted_at: 'desc' as const } :
                                  { total_compensation: 'desc' as const }

    const [records, total] = await Promise.all([
      prisma.salary.findMany({
        where,
        include: { company: { select: { name: true, slug: true } } },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.salary.count({ where })
    ])

    // Serialize BigInt fields
    const data = records.map((r: typeof records[number]) => ({
      ...r,
      base_salary: r.base_salary.toString(),
      bonus: r.bonus.toString(),
      stock: r.stock.toString(),
      total_compensation: r.total_compensation.toString(),
    }))

    return NextResponse.json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=3600'
      }
    })

  } catch (error) {
    console.error('Salaries error:', error)
    return NextResponse.json({ error: true, message: 'Internal Server Error' }, { status: 500 })
  }
}