"use client"

import DebateKeyArguments from "@/components/debate/DebateKeyArguments"

export default function DebateArguments({
  loadingArgs,
  threadedArguments,
  handleReplyClick,
  likeArgument,
  likingIds,
}: any) {
  return (
    <DebateKeyArguments
      loading={loadingArgs}
      threadedArgumentsFor={threadedArguments.for}
      threadedArgumentsAgainst={threadedArguments.against}
      onReplyClick={handleReplyClick}
      onLike={(id) => likeArgument(Number(id))}
      likingIds={likingIds.map(Number)}
    />
  )
}
