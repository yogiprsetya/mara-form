export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="md:mt-12 mt-6 pb-10 max-w-4xl w-full mx-auto">{children}</div>;
}
