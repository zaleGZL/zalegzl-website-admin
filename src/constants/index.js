import menus from './menus'

const domainSubDir = '/admin'
const adminAPIPrefix = '/admin/api'
const commonAPIPrefix = '/api'
const blogListPerPageCount = 5
const blogPagePrefix = '/blogs'
const blogListQs =
  'embed=tags,categories&fields=_id,title,summary,createTime,viewTimes,tags,category,markdownContent'

export {
  menus,
  domainSubDir,
  adminAPIPrefix,
  commonAPIPrefix,
  blogListPerPageCount,
  blogPagePrefix,
  blogListQs
}
