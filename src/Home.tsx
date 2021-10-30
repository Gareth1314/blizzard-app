import * as React from 'react'
import { getAuctions, Auction, ClientCredentials } from './BlizzardApi'
import Auctions from './Auctions'

export type Props = {
}

export type State = {
    loading: boolean
    auctionsData: Auction[] | null
    clientCredentials: ClientCredentials
}

export default class Home extends React.Component<Props, State> {
    state: State = {
        loading: false,
        auctionsData: null,
        clientCredentials: { clientId: "", secret: "" }
    }
    
    onGetAuctions = async () => {
        this.setState({
            loading: true
        })

        var result = await getAuctions(this.state.clientCredentials.clientId, this.state.clientCredentials.secret)
        console.log(result)
        
        this.setState({
            auctionsData: result.auctions,
            loading: false
        })
    }

    render() {
        return (
            <div>
                {!this.state.loading && !this.state.auctionsData &&
                    <div>
                        <p>Barthilas Auctions</p>
                        <button onClick={this.onGetAuctions}>Get Barthilas Auctions</button>
                    </div>
                }
                {this.state.loading &&
                    <div>
                        <h1>Loading...</h1>
                    </div>
                }
                {this.state.auctionsData &&
                    <Auctions
                        data={this.state.auctionsData}
                    />
                }
            </div>
        )
    }
}