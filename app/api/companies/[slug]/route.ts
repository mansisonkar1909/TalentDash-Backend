import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import type { Salary } from '@prisma/client'

function computeMedian(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const company = await prisma.company.findUnique({
      where: { slug: slug.toLowerCase().trim() },
      include: {
        salaries: { orderBy: { total_compensation: 'desc' } }
      }
    })

    if (!company) {
      return NextResponse.json(
        { error: true, message: 'Company not found' },
        { status: 404 }
      )
    }

    const totalCompValues = company.salaries.map(s => Number(s.total_compensation))

    const levelDistribution: Record<string, number> = {}
    company.salaries.forEach(s => {
      levelDistribution[s.level] = (levelDistribution[s.level] || 0) + 1
    })

    const salaries = company.salaries.map((s: Salary) => ({
      ...s,
      base_salary: s.base_salary.toString(),
      bonus: s.bonus.toString(),
      stock: s.stock.toString(),
      total_compensation: s.total_compensation.toString(),
    }))

    return NextResponse.json({
      id: company.id,
      name: company.name,
      slug: company.slug,
      industry: company.industry,
      headquarters: company.headquarters,
      founded_year: company.founded_year,
      headcount_range: company.headcount_range,
      median_total_compensation: computeMedian(totalCompValues),
      level_distribution: levelDistribution,
      salaries,
    }, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
      }
    })

  } catch (error) {
    console.error('Company error:', error)
    return NextResponse.json({ error: true, message: 'Internal Server Error' }, { status: 500 })
  }
}