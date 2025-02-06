import MyNavbar from "./layout/Navbar"; // Adjust the import based on your folder structure // Keep global styles here

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <MyNavbar /> {/* The Navbar is now globally included */}
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
