import './Popup.scss';

import * as React from 'react';

interface AppProps { }

interface AppState { }

export default class Popup extends React.Component<AppProps, AppState> {
    constructor(props: AppProps, state: AppState) {
        super(props, state);
    }

    componentDidMount() {
        // Example of how to send a message to eventPage.ts.
        chrome.runtime.sendMessage({ popupMounted: true });
    }

    render() {
        return (
            <div className="popupContainer">
                More features coming soon!
            </div>
        )
    }
}
