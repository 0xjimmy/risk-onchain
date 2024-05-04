import { HTMLAttributes } from "preact/compat"

export const Card = ({ children, ...otherProps }: HTMLAttributes<HTMLDivElement>) =>
  <div {...otherProps} class={`rounded-lg border bg-card text-card-foreground shadow-sm ${otherProps.className ?? ''}`}>
    {children}
  </div>

export const CardHeader = ({ children, ...otherProps }: HTMLAttributes<HTMLDivElement>) =>
  <div {...otherProps} class={`p-6 text-2xl font-semibold leading-none tracking-tight ${otherProps.className ?? ''}`} >
    {children}
  </div>

export const CardTitle = ({ children, ...otherProps }: HTMLAttributes<HTMLHeadingElement>) =>
  <h3 {...otherProps} class={`flex flex-col space-y-1.5 p - 6 ${otherProps.className ?? ''}`} >
    {children}
  </h3 >

export const CardDescription = ({ children, ...otherProps }: HTMLAttributes<HTMLParagraphElement>) =>
  <p {...otherProps} class={`text-sm text-muted-foreground ${otherProps.className ?? ''}`} >
    {children}
  </p>

export const CardContent = ({ children, ...otherProps }: HTMLAttributes<HTMLDivElement>) =>
  <div {...otherProps} class={`p-6 pt-0 ${otherProps.className ?? ''}`} >
    {children}
  </div >

export const CardFooter = ({ children, ...otherProps }: HTMLAttributes<HTMLDivElement>) =>
  <div {...otherProps} class={`flex items-center p-6 pt-0 ${otherProps.className ?? ''}`} >
    {children}
  </div>
