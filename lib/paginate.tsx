/**
 * Paginates an array by slicing it into the specified pageSize. Returns the requested pageNumber.
 * @param array The array to paginate
 * @param pageSize The size of each page
 * @param pageNumber The page number to be read
 * @returns An array containing the contents of the page
 */
export default function Paginate(array: Array<any>, pageSize: number, pageNumber: number) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}