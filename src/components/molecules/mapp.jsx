import React, { Component } from 'react'
import '../../App.css';
import Mapir from 'mapir-react-component';

const Map = Mapir.setToken({
    transformRequest: url => {
        return {
            url: url,
            headers: {
                "x-api-key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVjZTU4MzEzNmE2MWVjMzNmYmZkMjU4ODg1NDIwZGU3NWY3N2IwM2Y0OTI1NjAwZjkxN2FjNTJiZGI5NDgyNDk1MDAxMjMzNjczOTcyMDZhIn0.eyJhdWQiOiIyNTM1NiIsImp0aSI6ImVjZTU4MzEzNmE2MWVjMzNmYmZkMjU4ODg1NDIwZGU3NWY3N2IwM2Y0OTI1NjAwZjkxN2FjNTJiZGI5NDgyNDk1MDAxMjMzNjczOTcyMDZhIiwiaWF0IjoxNzAyNzEyOTgzLCJuYmYiOjE3MDI3MTI5ODMsImV4cCI6MTcwNTIxODU4Mywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.tXjpRONMWv6udL8xhd9MMJruL99dJVei8xaZIYrfLMnUvcC5cUZ_vpIzqzjvXzbnMnUybt2Ou_2EJ-dX5WDxkurLamox4mNRu49ZUD5B_Ors8vMk_BVAMhLdS4jZZHB1SDQzvDTFvRjLDZqs4tiV3pPfc1zCpj3bkpMg30TrzpjJSdfaWEf3Px8mwVt3jw0ldEeVHNfu-mnGG7z-ZpMJgEgDIepRaiJ5T0ZwSP6QINrgg_TVj8k1DPi04CBGf4EB5L9QJUrvjZads2SWIi-qVRda0uYkocaSMa_mdfvH_Bz9biHgIH_1Sh1F1laQtq0HCt6R_VHb-H1A6wRhyiIc1A", //Mapir api key
                "Mapir-SDK": "reactjs"
            }
        };
    }
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 35.72,
            lon: 51.42
        };
        this.reverseFunction = this.reverseFunction.bind(this);
    }

    componentDidMount() {
        // بررسی اینکه آیا مختصات در localStorage ذخیره شده است یا نه
        const savedCoordinates = localStorage.getItem('addressCoordinates');
        if (savedCoordinates) {
            const [savedLon, savedLat] = JSON.parse(savedCoordinates);
            this.setState({ lat: savedLat, lon: savedLon });
        }
    }

    reverseFunction(map, e) {
        const newLat = e.lngLat.lat;
        const newLon = e.lngLat.lng;

        // ذخیره مختصات جدید در localStorage
        localStorage.setItem('addressCoordinates', JSON.stringify([newLon, newLat]));

        // تنظیم مختصات جدید برای مارکر
        this.setState({ lat: newLat, lon: newLon });

        // درخواست معکوس جغرافیایی برای دریافت آدرس (اختیاری)
        fetch(`https://map.ir/reverse/no?lat=${newLat}&lon=${newLon}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVjZTU4MzEzNmE2MWVjMzNmYmZkMjU4ODg1NDIwZGU3NWY3N2IwM2Y0OTI1NjAwZjkxN2FjNTJiZGI5NDgyNDk1MDAxMjMzNjczOTcyMDZhIn0.eyJhdWQiOiIyNTM1NiIsImp0aSI6ImVjZTU4MzEzNmE2MWVjMzNmYmZkMjU4ODg1NDIwZGU3NWY3N2IwM2Y0OTI1NjAwZjkxN2FjNTJiZGI5NDgyNDk1MDAxMjMzNjczOTcyMDZhIiwiaWF0IjoxNzAyNzEyOTgzLCJuYmYiOjE3MDI3MTI5ODMsImV4cCI6MTcwNTIxODU4Mywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.tXjpRONMWv6udL8xhd9MMJruL99dJVei8xaZIYrfLMnUvcC5cUZ_vpIzqzjvXzbnMnUybt2Ou_2EJ-dX5WDxkurLamox4mNRu49ZUD5B_Ors8vMk_BVAMhLdS4jZZHB1SDQzvDTFvRjLDZqs4tiV3pPfc1zCpj3bkpMg30TrzpjJSdfaWEf3Px8mwVt3jw0ldEeVHNfu-mnGG7z-ZpMJgEgDIepRaiJ5T0ZwSP6QINrgg_TVj8k1DPi04CBGf4EB5L9QJUrvjZads2SWIi-qVRda0uYkocaSMa_mdfvH_Bz9biHgIH_1Sh1F1laQtq0HCt6R_VHb-H1A6wRhyiIc1A', // 🔴 کلید API خود را اینجا جایگزین کنید
            },
        })
        .then(response => response.json())
        .then(data => {
            // console.log("آدرس مکان انتخاب‌شده:", data);
        });
    }

    render() {
        return (
            <div className="App">
                <Mapir
                    center={[this.state.lon, this.state.lat]}
                    Map={Map}
                    onClick={this.reverseFunction}
                >
                    <Mapir.Layer type="symbol" layout={{ "icon-image": "harbor-15" }} />
                    <Mapir.Marker coordinates={[this.state.lon, this.state.lat]} anchor="bottom" />
                </Mapir>
            </div>
        );
    }
}