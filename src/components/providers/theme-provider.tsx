import {ThemeProvider as NextThemeProvider} from "next-themes"
const ThemeProvider = ({children}:Readonly<{children: React.ReactNode}>) =>{
return(
    <NextThemeProvider attribute="class" defaultTheme="dark" themes={["dark","light"]} disableTransitionOnChange>
        {children}
    </NextThemeProvider>
)
}

export default ThemeProvider;