const useFormatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export default useFormatDate
