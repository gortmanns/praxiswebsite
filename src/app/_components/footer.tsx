export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-background">
      <div className="container flex h-14 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {year} Praxiszentrum im Rind. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
