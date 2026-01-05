import CreateAdminDialog from "@/components/modules/dashboard/CreateAdminDialog";
import DeleteButton from "@/components/modules/dashboard/DeleteButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import getAllUsers from "@/services/dashboard/getAllusers";

async function ManageUsersPage() {
  const users = (await getAllUsers()).data;

  return (
    <div className="m-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
        <p className="text-muted-foreground mt-1">Overview of all the users</p>
      </div>
      <div>
        <CreateAdminDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="flex flex-col md:flex-row items-center gap-2 p-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.pic || ""} />
                <AvatarFallback>{user.name?.[0]}</AvatarFallback>
              </Avatar>

              <div className="space-y-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge variant="secondary" className="mt-2">
                  {user.role}
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <DeleteButton route={`/user/${user.id}`} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ManageUsersPage;
