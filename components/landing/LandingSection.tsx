


type Props = {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function LandingSection({ title, subtitle, children }: Props) {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-foreground">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-muted max-w-2xl">
            {subtitle}
          </p>
        )}

        <div className="mt-8">
          {children}
        </div>
      </div>
    </section>
  )
}
