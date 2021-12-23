import React, { ReactElement } from 'react'

interface Props {
  data: IArticle;
}

export default function DynamicRoute({data}: Props): ReactElement {
  return (
    <div>
      <h1>Hi Saman </h1>
    </div>
  )
}
