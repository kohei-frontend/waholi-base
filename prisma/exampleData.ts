// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// async function main() {
//   // 既存データをクリア
//   await prisma.post.deleteMany()
//   await prisma.postworkplace.deleteMany()

//   // ユーザーを作成（仮のユーザーIDを使用）
//   const user = await prisma.users.create({
//     data: {
//       id: 'user-1',
//       nickname: 'testuser',
//       age: 30,
//       gender: 'その他',
//       planType: 'free',
//     },
//   })

//   // postデータを作成
//   const post1 = await prisma.post.create({
//     data: {
//       userId: user.id,
//       postType: 'Workplace',
//       state: 'Victoria',
//       lga: 'Stonnington',
//       suburb: 'Armadale',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   })

//   const post2 = await prisma.post.create({
//     data: {
//       userId: user.id,
//       postType: 'Workplace',
//       state: 'New South Wales',
//       lga: 'Inner west',
//       suburb: 'Townsville',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   })

//   const post3 = await prisma.post.create({
//     data: {
//       userId: user.id,
//       postType: 'Workplace',
//       state: 'Queensland',
//       lga: 'Gold Coast',
//       suburb: 'Gold Coast',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   })

//   // postworkplaceデータを作成
//   await prisma.postworkplace.create({
//     data: {
//       postId: post1.id,
//       wage: 25.0,
//       atmosphere: ['Friendly', 'Professional'],
//       recommendationLevel: 4,
//       comment: 'Great place to work in Melbourne CBD.',
//     },
//   })

//   await prisma.postworkplace.create({
//     data: {
//       postId: post2.id,
//       wage: 22.5,
//       atmosphere: ['Relaxed', 'Collaborative'],
//       recommendationLevel: 5,
//       comment: 'Amazing work environment in Geelong.',
//     },
//   })

//   await prisma.postworkplace.create({
//     data: {
//       postId: post3.id,
//       wage: 20,
//       atmosphere: ['bad'],
//       recommendationLevel: 2,
//       comment: 'not really good.',
//     },
//   })

//   console.log('Seed data inserted successfully.')
// }

// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })