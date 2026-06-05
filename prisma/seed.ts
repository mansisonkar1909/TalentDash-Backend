import { PrismaClient } from '@prisma/client'
import 'dotenv/config'


const db = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  await db.salary.deleteMany()
  await db.company.deleteMany()
  console.log('🗑️  Cleared existing data')

  const tc = (base: bigint, bonus: bigint, stock: bigint) => base + bonus + stock

  // Create companies
  const google = await db.company.create({
    data: { name: 'Google', slug: 'google', normalized_name: 'google', industry: 'Technology', headquarters: 'Bengaluru', founded_year: 1998, headcount_range: '10000+' }
  })
  const amazon = await db.company.create({
    data: { name: 'Amazon', slug: 'amazon', normalized_name: 'amazon', industry: 'E-Commerce / Cloud', headquarters: 'Bengaluru', founded_year: 1994, headcount_range: '10000+' }
  })
  const microsoft = await db.company.create({
    data: { name: 'Microsoft', slug: 'microsoft', normalized_name: 'microsoft', industry: 'Technology', headquarters: 'Hyderabad', founded_year: 1975, headcount_range: '10000+' }
  })
  const meta = await db.company.create({
    data: { name: 'Meta', slug: 'meta', normalized_name: 'meta', industry: 'Social Media', headquarters: 'Mumbai', founded_year: 2004, headcount_range: '5000-10000' }
  })
  const flipkart = await db.company.create({
    data: { name: 'Flipkart', slug: 'flipkart', normalized_name: 'flipkart', industry: 'E-Commerce', headquarters: 'Bengaluru', founded_year: 2007, headcount_range: '5000-10000' }
  })
  const tcs = await db.company.create({
    data: { name: 'TCS', slug: 'tcs', normalized_name: 'tcs', industry: 'IT Services', headquarters: 'Mumbai', founded_year: 1968, headcount_range: '10000+' }
  })
  const infosys = await db.company.create({
    data: { name: 'Infosys', slug: 'infosys', normalized_name: 'infosys', industry: 'IT Services', headquarters: 'Bengaluru', founded_year: 1981, headcount_range: '10000+' }
  })
  const wipro = await db.company.create({
    data: { name: 'Wipro', slug: 'wipro', normalized_name: 'wipro', industry: 'IT Services', headquarters: 'Bengaluru', founded_year: 1945, headcount_range: '10000+' }
  })
  const razorpay = await db.company.create({
    data: { name: 'Razorpay', slug: 'razorpay', normalized_name: 'razorpay', industry: 'Fintech', headquarters: 'Bengaluru', founded_year: 2014, headcount_range: '1000-5000' }
  })
  const nvidia = await db.company.create({
    data: { name: 'NVIDIA', slug: 'nvidia', normalized_name: 'nvidia', industry: 'Semiconductor / AI', headquarters: 'Pune', founded_year: 1993, headcount_range: '1000-5000' }
  })
  const zepto = await db.company.create({
    data: { name: 'Zepto', slug: 'zepto', normalized_name: 'zepto', industry: 'Quick Commerce', headquarters: 'Mumbai', founded_year: 2021, headcount_range: '500-1000' }
  })
  const meesho = await db.company.create({
    data: { name: 'Meesho', slug: 'meesho', normalized_name: 'meesho', industry: 'E-Commerce', headquarters: 'Bengaluru', founded_year: 2015, headcount_range: '1000-5000' }
  })

  console.log('✅ Companies created')

  await db.salary.createMany({
    data: [
      // GOOGLE
      { company_id: google.id, role: 'Software Engineer', level: 'L3', location: 'Bengaluru', currency: 'INR', experience_years: 1, base_salary: 1800000n, bonus: 200000n, stock: 150000n, total_compensation: tc(1800000n, 200000n, 150000n), source: 'CONTRIBUTOR', confidence_score: 0.95, is_verified: true },
      { company_id: google.id, role: 'Software Engineer', level: 'L4', location: 'Bengaluru', currency: 'INR', experience_years: 3, base_salary: 2800000n, bonus: 400000n, stock: 500000n, total_compensation: tc(2800000n, 400000n, 500000n), source: 'CONTRIBUTOR', confidence_score: 0.95, is_verified: true },
      { company_id: google.id, role: 'Software Engineer', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 6, base_salary: 4200000n, bonus: 800000n, stock: 1200000n, total_compensation: tc(4200000n, 800000n, 1200000n), source: 'CONTRIBUTOR', confidence_score: 0.92, is_verified: true },
      { company_id: google.id, role: 'Software Engineer', level: 'L6', location: 'Bengaluru', currency: 'INR', experience_years: 10, base_salary: 6000000n, bonus: 1500000n, stock: 3000000n, total_compensation: tc(6000000n, 1500000n, 3000000n), source: 'SCRAPED', confidence_score: 0.75, is_verified: false },
      { company_id: google.id, role: 'Product Manager', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 7, base_salary: 4500000n, bonus: 1000000n, stock: 2000000n, total_compensation: tc(4500000n, 1000000n, 2000000n), source: 'CONTRIBUTOR', confidence_score: 0.90, is_verified: true },
      { company_id: google.id, role: 'Software Engineer', level: 'L5', location: 'San Francisco', currency: 'USD', experience_years: 5, base_salary: 220000n, bonus: 40000n, stock: 80000n, total_compensation: tc(220000n, 40000n, 80000n), source: 'SCRAPED', confidence_score: 0.80, is_verified: false },

      // AMAZON
      { company_id: amazon.id, role: 'Software Development Engineer', level: 'SDE_I', location: 'Bengaluru', currency: 'INR', experience_years: 1, base_salary: 1600000n, bonus: 150000n, stock: 200000n, total_compensation: tc(1600000n, 150000n, 200000n), source: 'CONTRIBUTOR', confidence_score: 0.93, is_verified: true },
      { company_id: amazon.id, role: 'Software Development Engineer', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 2600000n, bonus: 400000n, stock: 800000n, total_compensation: tc(2600000n, 400000n, 800000n), source: 'CONTRIBUTOR', confidence_score: 0.91, is_verified: true },
      { company_id: amazon.id, role: 'Software Development Engineer', level: 'SDE_III', location: 'Bengaluru', currency: 'INR', experience_years: 8, base_salary: 3800000n, bonus: 700000n, stock: 1500000n, total_compensation: tc(3800000n, 700000n, 1500000n), source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true },
      { company_id: amazon.id, role: 'Software Development Engineer', level: 'SDE_I', location: 'Hyderabad', currency: 'INR', experience_years: 2, base_salary: 1700000n, bonus: 0n, stock: 250000n, total_compensation: tc(1700000n, 0n, 250000n), source: 'CONTRIBUTOR', confidence_score: 0.90, is_verified: true },
      { company_id: amazon.id, role: 'Data Engineer', level: 'SDE_II', location: 'Hyderabad', currency: 'INR', experience_years: 5, base_salary: 2400000n, bonus: 300000n, stock: 600000n, total_compensation: tc(2400000n, 300000n, 600000n), source: 'SCRAPED', confidence_score: 0.72, is_verified: false },

      // MICROSOFT
      { company_id: microsoft.id, role: 'Software Engineer', level: 'L4', location: 'Hyderabad', currency: 'INR', experience_years: 3, base_salary: 2200000n, bonus: 300000n, stock: 400000n, total_compensation: tc(2200000n, 300000n, 400000n), source: 'CONTRIBUTOR', confidence_score: 0.90, is_verified: true },
      { company_id: microsoft.id, role: 'Software Engineer', level: 'L5', location: 'Hyderabad', currency: 'INR', experience_years: 6, base_salary: 3400000n, bonus: 600000n, stock: 1000000n, total_compensation: tc(3400000n, 600000n, 1000000n), source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true },
      { company_id: microsoft.id, role: 'Software Engineer', level: 'L6', location: 'Hyderabad', currency: 'INR', experience_years: 10, base_salary: 4800000n, bonus: 1000000n, stock: 2000000n, total_compensation: tc(4800000n, 1000000n, 2000000n), source: 'SCRAPED', confidence_score: 0.74, is_verified: false },
      { company_id: microsoft.id, role: 'Software Engineer', level: 'PRINCIPAL', location: 'Hyderabad', currency: 'INR', experience_years: 15, base_salary: 7000000n, bonus: 2000000n, stock: 0n, total_compensation: tc(7000000n, 2000000n, 0n), source: 'CONTRIBUTOR', confidence_score: 0.91, is_verified: true },

      // META
      { company_id: meta.id, role: 'Software Engineer', level: 'IC4', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 3500000n, bonus: 600000n, stock: 1000000n, total_compensation: tc(3500000n, 600000n, 1000000n), source: 'CONTRIBUTOR', confidence_score: 0.89, is_verified: true },
      { company_id: meta.id, role: 'Software Engineer', level: 'IC5', location: 'Bengaluru', currency: 'INR', experience_years: 7, base_salary: 5000000n, bonus: 1000000n, stock: 2500000n, total_compensation: tc(5000000n, 1000000n, 2500000n), source: 'CONTRIBUTOR', confidence_score: 0.92, is_verified: true },
      { company_id: meta.id, role: 'Data Scientist', level: 'IC4', location: 'Mumbai', currency: 'INR', experience_years: 5, base_salary: 3200000n, bonus: 500000n, stock: 800000n, total_compensation: tc(3200000n, 500000n, 800000n), source: 'SCRAPED', confidence_score: 0.71, is_verified: false },

      // FLIPKART
      { company_id: flipkart.id, role: 'Software Development Engineer', level: 'SDE_I', location: 'Bengaluru', currency: 'INR', experience_years: 1, base_salary: 1400000n, bonus: 150000n, stock: 100000n, total_compensation: tc(1400000n, 150000n, 100000n), source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true },
      { company_id: flipkart.id, role: 'Software Development Engineer', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 2200000n, bonus: 300000n, stock: 400000n, total_compensation: tc(2200000n, 300000n, 400000n), source: 'CONTRIBUTOR', confidence_score: 0.86, is_verified: true },
      { company_id: flipkart.id, role: 'Software Development Engineer', level: 'SDE_III', location: 'Bengaluru', currency: 'INR', experience_years: 7, base_salary: 3200000n, bonus: 600000n, stock: 800000n, total_compensation: tc(3200000n, 600000n, 800000n), source: 'SCRAPED', confidence_score: 0.73, is_verified: false },

      // TCS
      { company_id: tcs.id, role: 'Software Engineer', level: 'L3', location: 'Mumbai', currency: 'INR', experience_years: 1, base_salary: 400000n, bonus: 30000n, stock: 0n, total_compensation: tc(400000n, 30000n, 0n), source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true },
      { company_id: tcs.id, role: 'Software Engineer', level: 'L4', location: 'Mumbai', currency: 'INR', experience_years: 4, base_salary: 700000n, bonus: 50000n, stock: 0n, total_compensation: tc(700000n, 50000n, 0n), source: 'CONTRIBUTOR', confidence_score: 0.85, is_verified: true },
      { company_id: tcs.id, role: 'Software Engineer', level: 'L5', location: 'Pune', currency: 'INR', experience_years: 8, base_salary: 1100000n, bonus: 100000n, stock: 0n, total_compensation: tc(1100000n, 100000n, 0n), source: 'SCRAPED', confidence_score: 0.72, is_verified: false },
      { company_id: tcs.id, role: 'Data Analyst', level: 'L3', location: 'Hyderabad', currency: 'INR', experience_years: 2, base_salary: 450000n, bonus: 40000n, stock: 0n, total_compensation: tc(450000n, 40000n, 0n), source: 'CONTRIBUTOR', confidence_score: 0.83, is_verified: true },

      // INFOSYS
      { company_id: infosys.id, role: 'Software Engineer', level: 'L3', location: 'Bengaluru', currency: 'INR', experience_years: 1, base_salary: 380000n, bonus: 20000n, stock: 0n, total_compensation: tc(380000n, 20000n, 0n), source: 'CONTRIBUTOR', confidence_score: 0.87, is_verified: true },
      { company_id: infosys.id, role: 'Software Engineer', level: 'L4', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 650000n, bonus: 50000n, stock: 0n, total_compensation: tc(650000n, 50000n, 0n), source: 'CONTRIBUTOR', confidence_score: 0.84, is_verified: true },
      { company_id: infosys.id, role: 'DevOps Engineer', level: 'L4', location: 'Hyderabad', currency: 'INR', experience_years: 5, base_salary: 720000n, bonus: 50000n, stock: 0n, total_compensation: tc(720000n, 50000n, 0n), source: 'CONTRIBUTOR', confidence_score: 0.83, is_verified: true },

      // WIPRO
      { company_id: wipro.id, role: 'Software Engineer', level: 'L3', location: 'Bengaluru', currency: 'INR', experience_years: 1, base_salary: 350000n, bonus: 20000n, stock: 0n, total_compensation: tc(350000n, 20000n, 0n), source: 'CONTRIBUTOR', confidence_score: 0.86, is_verified: true },
      { company_id: wipro.id, role: 'Software Engineer', level: 'L4', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 600000n, bonus: 40000n, stock: 0n, total_compensation: tc(600000n, 40000n, 0n), source: 'CONTRIBUTOR', confidence_score: 0.83, is_verified: true },

      // RAZORPAY
      { company_id: razorpay.id, role: 'Software Engineer', level: 'SDE_I', location: 'Bengaluru', currency: 'INR', experience_years: 1, base_salary: 1500000n, bonus: 150000n, stock: 200000n, total_compensation: tc(1500000n, 150000n, 200000n), source: 'CONTRIBUTOR', confidence_score: 0.91, is_verified: true },
      { company_id: razorpay.id, role: 'Software Engineer', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 2400000n, bonus: 350000n, stock: 500000n, total_compensation: tc(2400000n, 350000n, 500000n), source: 'CONTRIBUTOR', confidence_score: 0.89, is_verified: true },
      { company_id: razorpay.id, role: 'Software Engineer', level: 'STAFF', location: 'Bengaluru', currency: 'INR', experience_years: 10, base_salary: 4000000n, bonus: 800000n, stock: 1500000n, total_compensation: tc(4000000n, 800000n, 1500000n), source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true },

      // NVIDIA
      { company_id: nvidia.id, role: 'Software Engineer', level: 'L4', location: 'Pune', currency: 'INR', experience_years: 4, base_salary: 3000000n, bonus: 500000n, stock: 2000000n, total_compensation: tc(3000000n, 500000n, 2000000n), source: 'CONTRIBUTOR', confidence_score: 0.91, is_verified: true },
      { company_id: nvidia.id, role: 'ML Engineer', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 6, base_salary: 4200000n, bonus: 700000n, stock: 3500000n, total_compensation: tc(4200000n, 700000n, 3500000n), source: 'SCRAPED', confidence_score: 0.76, is_verified: false },
      { company_id: nvidia.id, role: 'Software Engineer', level: 'PRINCIPAL', location: 'Pune', currency: 'USD', experience_years: 18, base_salary: 350000n, bonus: 80000n, stock: 200000n, total_compensation: tc(350000n, 80000n, 200000n), source: 'CONTRIBUTOR', confidence_score: 0.93, is_verified: true },

      // ZEPTO
      { company_id: zepto.id, role: 'Software Engineer', level: 'SDE_I', location: 'Mumbai', currency: 'INR', experience_years: 1, base_salary: 1300000n, bonus: 100000n, stock: 150000n, total_compensation: tc(1300000n, 100000n, 150000n), source: 'CONTRIBUTOR', confidence_score: 0.85, is_verified: true },
      { company_id: zepto.id, role: 'Software Engineer', level: 'SDE_II', location: 'Mumbai', currency: 'INR', experience_years: 3, base_salary: 2000000n, bonus: 250000n, stock: 350000n, total_compensation: tc(2000000n, 250000n, 350000n), source: 'CONTRIBUTOR', confidence_score: 0.83, is_verified: true },
      { company_id: zepto.id, role: 'Data Engineer', level: 'SDE_I', location: 'Mumbai', currency: 'INR', experience_years: 2, base_salary: 1400000n, bonus: 0n, stock: 200000n, total_compensation: tc(1400000n, 0n, 200000n), source: 'CONTRIBUTOR', confidence_score: 0.84, is_verified: true },

      // MEESHO
      { company_id: meesho.id, role: 'Software Engineer', level: 'L3', location: 'Bengaluru', currency: 'INR', experience_years: 1, base_salary: 1300000n, bonus: 100000n, stock: 80000n, total_compensation: tc(1300000n, 100000n, 80000n), source: 'CONTRIBUTOR', confidence_score: 0.86, is_verified: true },
      { company_id: meesho.id, role: 'Software Engineer', level: 'L4', location: 'Bengaluru', currency: 'INR', experience_years: 3, base_salary: 2000000n, bonus: 250000n, stock: 300000n, total_compensation: tc(2000000n, 250000n, 300000n), source: 'CONTRIBUTOR', confidence_score: 0.84, is_verified: true },
      { company_id: meesho.id, role: 'Data Scientist', level: 'L4', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 2100000n, bonus: 280000n, stock: 350000n, total_compensation: tc(2100000n, 280000n, 350000n), source: 'SCRAPED', confidence_score: 0.70, is_verified: false },
    ]
  })

  console.log('✅ Salary records created')
  console.log('\n🎉 Seed complete!')
  console.log('   Companies: 12')
  console.log('   Salary records: 42+')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })