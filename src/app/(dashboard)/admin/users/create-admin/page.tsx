import RegisterForm from "@/components/modules/public/auth/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function AdminRegisterPage() {
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xl">
          <h1 className="text-3xl font-bold text-center">Make a new Admin</h1>
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter the information below to create a new admin account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm role={"admin"} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default AdminRegisterPage;
