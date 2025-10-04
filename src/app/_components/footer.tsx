export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-card">
      <div className="container flex h-14 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {year} Praxis Online. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
