import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { NavigationIndicator, Disciplina } from './'
import ViewPager from "@react-native-community/viewpager";

export default class DisciplinasViewPager extends Component {
    setPage(index) {
        this.viewPager.setPage(index);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ViewPager
                    style={{ flex: 1 }}
                    initialPage={0}
                    onPageSelected={this.props.onPageSelected}
                    ref={viewPager => {
                        this.viewPager = viewPager;
                    }}>
                    {
                        this.props.disciplinas.map((x, i) => {
                            return (<View key={i} style={{ flex: 1 }}>
                                <Disciplina detalhes={x} />
                            </View>)
                        })
                    }
                </ViewPager>
                <NavigationIndicator style={styles.indicator} numberOfPages={this.props.disciplinas.length} currentPage={this.props.currentPage} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    indicator: {
        position: 'absolute',
        bottom: Dimensions.get('window').height * 0.06,
        width: '100%'
    }
});
