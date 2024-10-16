import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [ { emit: 'event', level: 'query' } ]
})

prisma.$on('query', event => {
  console.log(event.query)
  if(event.params) console.log('PARAMS:', event.params)
})

export default prisma