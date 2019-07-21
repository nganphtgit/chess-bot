import MatchRepository from '@/repository/MatchRepository'

const repositories = {
  match: MatchRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
