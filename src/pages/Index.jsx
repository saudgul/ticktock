import LoginForm from "@/components/auth/LoginForm";
import BrandPanel from "@/components/auth/BrandPanel";

const Index = () => {
  return (
    <main className="min-h-screen grid md:grid-cols-2 bg-background">
      <section className="flex items-center justify-center px-6 py-16 md:px-12">
        <LoginForm />
      </section>
      <BrandPanel />
    </main>
  );
};

export default Index;