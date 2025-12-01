export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container mx-auto py-8 px-4 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Powerhouse Korea. All rights reserved.</p>
            </div>
        </footer>
    );
}
