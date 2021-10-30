import * as React from 'react'
import { Auction } from './BlizzardApi'


export type Props = {
    data: Auction[]
}

export type State = {
}

export default class Auctions extends React.Component<Props, State> {

    render() {
        return (
            <div>
                {this.props.data.map(auction => 
                    <div key={auction.id}>
                        {auction.id}
                    </div>
                )}
            </div>
        )
    }
}