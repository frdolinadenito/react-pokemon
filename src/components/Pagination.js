import React from 'react'
import Button from 'react-bootstrap/Button'
import styled from '@emotion/styled'
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
const hotpink = css({
    color: 'hotpink'
  })
  
  const hotpinkHoverOrFocus = css({
    '&:hover,&:focus': hotpink,
    margin: 10
  })

const Badge = styled.span`
background-color:${props => props.VariantColor ? props.VariantColor: 'grey'};
color:#fff;
padding:10px;
border-radius:3px;
margin:10px;`;

// const PageButton = styled.Button`
// background-color:${props => props.VariantColor ? props.VariantColor: 'grey'};
// // color:#fff;
// // padding:10px;
// // border-radius:3px;
// // margin:10px;
// `;

export default function Pagination({gotoNextPage,gotoPrevPage}) {
    return (
        <div>
            {gotoPrevPage && <Button  css={hotpinkHoverOrFocus} onClick={gotoPrevPage} className="previous">Previous</Button>}
            {gotoNextPage && <Button onClick={gotoNextPage} className="next">Next</Button>}
        </div>
    )
}
