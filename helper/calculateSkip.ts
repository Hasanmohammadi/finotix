const calculateSkip = ({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}): number => page && (page - 1) * pageSize

export default calculateSkip
