import React, { Component } from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
export default class PayPal extends Component{
    state={
        accessToken:null,
        approvalUrl:null,
        payemntId:null
    }
    componentDidMount(){
        const dataDetail={
            "intent":"sale",
            "payer":{
                "payment_method":"paypal"
            },
            "transactions":[{
                "amount":{
                    "total":"0.01",
                    "currency":"USD",
                    "details":{
                        "subtotal":"0.01",
                        "tax":"0",
                        "shipping":"0",
                        "handling_fee":"0",
                        "shipping_discount":"0",
                        "insurance":"0"
                    }
                }
            }],
            "redirect_urls":{
                "return_url":"https://example.com",
                "cancel_url":"httpd://example.com"
            }

        }
        fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token",{
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization":"A21AALDPGvnriD2okdXOZdW4AJ1wFTECp3ljqayDzRW3c7MIM8spO2l4TSgOzTbNjrG84_X8LfTp35UaoDq9YIVdj71OZ4Uzg"
            },
            body:"grant_type=client_credentials"
        })
        .then(res=>res.json()).then(response=>{
            console.log(response);
            this.setState({
                accessToken:response.access_token
            })
            fetch("https://api-m.sandbox.paypal.com/v1/payments/payment",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${response.access_token}`
                },
                body:JSON.stringify(dataDetail)
            })
            .then(res=>res.json()).then(response=>{
                console.log("response2",response)
                const{id,links}=response
                const approvalUrl=links.find(data=>data.rel=="approval_url")
                console.log("approval_url",approvalUrl);
                this.setState({
                    payemntId:id,
                    approvalUrl:approvalUrl.href
                })
            }).catch(err=>{
                console.log({...err})
            })
            
        }
        
        ).catch(err=>{
            console.log(err)
        })
    }
    onNavigationStateChange=(webViewState)=>{
        console.log("webviewstate",webViewState);
        if(webViewState.url.includes("https://example.com")){
            this.setState(
                {
                    approvalUrl:null
                }
            )
            const{PayerID,payemntId}=webViewState.url;
            fetch(`https://api-m.sandbox.paypal.com/v1/payments/payment/${payemntId}/execute`,{
                method:"POST",
                body:{
                    payer_id:PayerID
                },
                headers:{
                    "Content_Type":"application/json",
                    "Authorization":`Bearer ${this.state.accessToken}`
                }
            }).then(res=>res.json()).then(response=>{
                console.log("response3",response)
                if(response.name=="INVALID_RESOURCE_ID"){
                    alert("payment failed please try again")
                    this.setState({
                        approvalUrl:null
                    })
                    this.props.navigation.pop()
                }
            }).catch(err=>{
                console.log({...err});     
            
            })
        }
    }
   
    render(){
        const{approvalUrl}=this.state
        return(
            <View style={{flex:1}}>
                {approvalUrl?
                <WebView source={{uri:approvalUrl}}
                
                 onNavigationStateChange={this._onNavigationStateChange}
                 javaScriptEnabled={true}
                 domStorageEnabled={true}
                 startInLoadingState={false}
                 />
                :<View>
                <Text>dont press</Text>
                </View>
                
                }
            </View>
        )
    }
}