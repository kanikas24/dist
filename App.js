import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, ScrollView, StatusBar, Button, Animated, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import ViewMoreText from 'react-native-view-more-text';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

export default class App extends Component {
   constructor() {
    super();
    this.state = {
        content: [],
        photos: [],
        name: '',
        type: '',
        rating: '',
        description: '',
    }
}
  
ServerAccess() {
    fetch("http://mywoobly.com/assignment.php" , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },      
})
    .then((response) => response.json())
    .then((res)=>{
        console.warn("data from api", res.data)
        this.setState ({
            content:res.data.story,
            name: res.data.name,
            type:res.data.type,
            description: res.data.description,
            rating: res.data.rating,
            photos: res.data.images
        })
    })
}


    renderViewMore = (onPress) => {
      return(
            <Text onPress={onPress} style= {{color: 'white'}}>View more</Text>
      )
    }
    

    renderViewLess = (onPress) => {
      return(
            <Text onPress={onPress} style= {{color: 'white'}}>View less</Text>
      )
    }

componentWillMount() {
    this.animatedValue = new Animated.Value(0)
}

componentDidMount() {
    this.ServerAccess()
    let scrollValue = 0;
    setInterval(function(){
      scrollValue = scrollValue + width;   // width = screen width 
      _scrollView.scrollTo({x: scrollValue}) 
    }, 4000);

    Animated.timing(this.animatedValue, {
        toValue:1,
        duration:1500
    }).start()
}

    render() {
        const { scrollContainer, container, sliderImage, textContainer, upperContainer, description, stars,
                overlapContainer, icon, aboutContainer, button, footer, lowerConatiner, tabNav, text, 
                smallImage, colorWhite, page, borderData, rating, photos, font18, myStarStyle, myEmptyStarStyle} = styles;
        
        const interpolateRotation = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],

        })

        
    return (
        <ScrollView style= {scrollContainer}> 
            <View style= {container}>
            <StatusBar barStyle="dark-content"/>
                <View style= {upperContainer}>             
                   <ScrollView 
                        ref={(scrollView) => { _scrollView = scrollView; }}
                        horizontal={true} pagingEnabled={true} 
                    >
                    {this.state.content.map(function(images) {
                        return (<View style={[{width:width,  height: 350}]} key={images}>                   
                            <Image
                                source={{uri: images}}
                                style={{flex:1}}/>                   
                        </View>)
                    })}                
                   </ScrollView> 
                       <View style= {icon}>
                            <Image source={{uri: 'http://mariafresa.net/data_gallery/heart-outline-clip-art-at-clker-com-vector-clip-art-online-royalty-3S6KPT-clipart.png'}} style= {{height:20, width:20}}/>
                       </View>
                    <View style={overlapContainer}>
                        <Animated.View style={{padding:10, position:'absolute', backgroundColor:'rgba(243,70,109,.7)',height:130, width:300, transform: [{ rotate: interpolateRotation }]}}>
                            <Text style={{fontWeight:'700', fontSize:24, color:'#fff'}}>{this.state.name}</Text>
                            <Text style={{fontWeight:'600', fontSize:20, color:'#fff'}}>Greater Kailash Part-II</Text>
                            <Text style={{color:'#fff', fontSize:18}}>{this.state.type}</Text>
                            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                <Text style={{color:'#fff', fontSize:18}}>Open till 11:00PM</Text>
                                <Text style={{color:'#fff', fontSize:18}}>{this.state.rating} rating</Text>
                            </View>
                        </Animated.View>
                    </View> 
                </View>                                            
               <View style={lowerConatiner}>
                    <View style={aboutContainer}>
                        <Text style={text}>ABOUT MOLECULE</Text>
                            <ViewMoreText
                                numberOfLines={3}
                                renderViewMore={() => this.renderViewMore}
                                renderViewLess={() => this.renderViewLess}
                                textStyle={{textAlign: 'center'}}
                                color={{color: '#fff'}}>
                                <Text style={description}>{this.state.description}</Text>
                            </ViewMoreText>
                    </View>
                    <View style={tabNav}> 
                            <Text style={text}> Menu Listed </Text>
                            <View style={page}> 
                                <TouchableOpacity>                               
                                    <Image source = {{uri: 'https://b.zmtcdn.com/data/menus/655/53655/7ac6493051b883a818aa599b8e2ff964.jpg'}} style= {smallImage}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source = {{uri: 'https://b.zmtcdn.com/data/menus/004/301004/12545d2b5fa408de9a29e995453bac51.jpg'}} style= {smallImage}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source = {{uri:'https://b.zmtcdn.com/data/menus/560/10560/13831045e6ce0234f5f8b7301e38faba.jpg'}} style= {smallImage}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source = {{uri: 'https://b.zmtcdn.com/data/menus/438/36438/7e81fec8f179d57816c61b9b29d6f02a.jpg'}} style= {smallImage}/>
                                </TouchableOpacity>
                            </View>
                            <View style= {borderData}>
                                <Text style={rating}>Rating</Text>
                                <View style={stars}>
                                    <Text style={description}>{this.state.rating} rating</Text>
                                    <Stars
                                        default={4.5}
                                        count={5}
                                        half={true}
                                        starSize={50}
                                        fullStar={<Icon name={'star'} style={[myStarStyle]}/>}
                                        emptyStar={<Icon name={'star-outline'} style={[myStarStyle, myEmptyStarStyle]}/>}
                                        halfStar={<Icon name={'star-half'} style={[myStarStyle]}/>}
                                      />
                                  </View>
                            </View>
                            <View style= {borderData}>
                                <Text style={{marginBottom:10, fontWeight:'700', fontSize:24, color: '#fff', marginTop:20}}>Photos and Videos</Text>
                                <View style={page}>
                                    <ScrollView style = {photos}
                                    horizontal={true}>
                                    {this.state.photos.map(function(photos) {
                                        return (<TouchableOpacity style={[{width:140,  height: 140, margin:5}]}  key={photos}>                   
                                        <Image
                                            source={{uri: photos}}
                                            style={{width:140,  height: 140}}/>
                                        </TouchableOpacity>)
                                    })}
                                    </ScrollView>
                                </View>   
                            </View>
                    </View> 
                    <View style={footer}>
                        <Button style={button} title= 'Book A Table' color= '#F3466D'></Button>
                    </View>
  
                </View>      
                </View> 

            </ScrollView>
        )
    } 
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex:1,
        //backgroundColor: '#000'
    },
    container: {
        padding:10,
        //position:'absolute',
        flex: 1,
        backgroundColor:'#000',
        marginTop:15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    upperContainer: {
        width:width,  
        height: 375,
        marginBottom:50

    },
    overlapContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        
        //marginBottom:10
    },
    stars: {
        flexDirection: 'row'
    },
    borderData: {
        borderTopWidth: 0.2, 
        borderColor: '#fff', 
        marginTop:20
    },
    lowerConatiner: {
         backgroundColor:'rgba(0,0,0,.7)',
        marginTop:30,
        position:'relative',
    },
    aboutContainer: {
        marginTop:20,
        color: '#fff'
    },
    tabNav: {
        borderTopWidth: 0.2,
        borderColor: '#fff',
        marginTop:20
    },
    icon: {
         margin:10,
        position:'absolute',
        right:0,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',  
    },
    page: {
        flexDirection:'row',
        marginTop:10
    },
    rating: {
        marginTop:10,
        fontWeight:'700',
        fontSize:24,   
        marginTop:30,
        color: '#fff'
    },
    text: {
        fontWeight:'700',
        fontSize:24,
        marginTop:10,
        color: '#fff'
    },
    description: {
        fontSize:16, 
        marginTop:10,
        color:'white',
        marginRight:10
    },
    photos: {
        flexDirection:'row'
    },
    footer: {
        borderRadius:4,
        margin:10,
        marginTop:10,
        position:'relative',
        bottom:0
    },
    smallImage: {
        height:80, 
        width:70, 
        margin:5
    },
    colorWhite: {
        color:'#fff'
    },
    font18: {
        fontSize: 18
    },
    myStarStyle: {
    marginTop:15,
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    marginTop:15,
    color: 'white',
  }
});



