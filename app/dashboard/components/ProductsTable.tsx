import { getProducts } from "@/appwrite/product.actions"
import { columns } from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"

export default async function ProductsTable() {
    const data = await getProducts()
    return (
        <div className="max-w-4xl py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
