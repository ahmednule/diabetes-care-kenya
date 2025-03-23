import DashboardLayout from "@/components/DashboardLayout";

export default function ReadingsPage(){
    return (
        <DashboardLayout>
        <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold">Readings Page</h1>
              <p className="text-muted-foreground">
                This is where you will get a list of all the readings you have inputed
              </p>
            </div>
          </div>
        </main>
        </div>
        </DashboardLayout>
    )
}