import { PolymorphicComponent, Text, styles } from "@ripple/design-system"
import { mergeClasses } from "@ripple/ui-helpers"
import { ComponentProps } from "react"

type TruncatedTextProps = ComponentProps<typeof Text> & {
  text?: string
}

export const TruncatedText: PolymorphicComponent<"p", TruncatedTextProps> = ({
  className,
  text = "",
  ...rest
}: TruncatedTextProps) => (
  <Text
    {...rest}
    className={mergeClasses(styles.truncate(), className)}
    css={{ width: "auto" }}
    title={text}
  >
    {text}
  </Text>
)
