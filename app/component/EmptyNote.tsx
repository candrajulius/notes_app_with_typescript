import { Empty } from "antd"

type EmptyNoteProps = {
  descriptions: string;
}

export default function EmptyNote({descriptions}: EmptyNoteProps)
{
 return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Empty description={descriptions} />
    </div>
 );
}
