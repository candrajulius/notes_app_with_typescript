import { Typography } from "antd";
import Link from "next/link";
const { Text } = Typography;

type FooterTextProps = {
  prompt: string;
  actionText: string;
  actionLink: string;
}

const AuthFooterText = ({ prompt, actionText, actionLink }: FooterTextProps) => {
  return (
     <div className="text-center">
        <Text type="secondary">
          {prompt}
        </Text>{" "}
        <Link href={actionLink} className={`font-medium text-blue-500! cursor-pointer`}>
          {actionText}
        </Link>
      </div>
  )
}

export default AuthFooterText;
