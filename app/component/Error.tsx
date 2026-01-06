import { CloseCircleOutlined } from "@ant-design/icons";
import { Layout, Result } from "antd";

type ErrorProps = {
  error: string;
}

export default function Error({error}: ErrorProps) {
  return (<Layout className="min-h-screen !bg-white">
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Result status="error" title="Failed to load contacts" subTitle={error} icon={<CloseCircleOutlined />} />
    </div>
  </Layout>
  );
}