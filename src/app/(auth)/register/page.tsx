import RegisterForm from "@/components/modules/public/auth/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: "tourist" | "guide" }>;
}) {
  const params = (await searchParams) || {};
  const isGuide = params.role === "guide";
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xl">
          <h1 className="text-3xl font-bold text-center">
            {isGuide ? "Become a Guide!" : "Join us Tourist!"}
          </h1>
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your information below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm role={params.role as "tourist" | "guide"} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
