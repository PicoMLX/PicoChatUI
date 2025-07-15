import { cn } from "@/lib/utils"
import { ModelProvider } from "@/types"
import { IconSparkles } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import { FC, HTMLAttributes } from "react"

interface ModelIconProps extends HTMLAttributes<HTMLDivElement> {
  provider: ModelProvider
  height: number
  width: number
}

export const ModelIcon: FC<ModelIconProps> = ({
  provider,
  height,
  width,
  ...props
}) => {
  const { theme } = useTheme()

  switch (provider as ModelProvider) {
    case "ollama":
      return (
        <IconSparkles
          className={cn(
            "rounded-sm p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          size={width}
        />
      )
    case "custom":
      return (
        <IconSparkles
          className={cn(
            "rounded-sm p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          size={width}
        />
      )
    default:
      return <IconSparkles size={width} />
  }
}
