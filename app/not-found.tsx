import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-[1200px] px-6 pb-32 pt-44 lg:px-10 lg:pb-40 lg:pt-56">
        <p className="eyebrow text-accent">Error 404</p>
        <h1 className="mt-6 text-white">Page not found</h1>
        <p className="lede mt-6 max-w-xl text-white/85">
          The page you are looking for has moved or no longer exists.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/" variant="light">
            Back to home
          </Button>
          <Button href="/contact" variant="outline">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
