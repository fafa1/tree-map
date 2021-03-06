
$.getJSON('exemplo.json', function (data) {

    let points = [],
        regionP,
        regionVal,
        regionI = 0,
        mes,
        mesP,
        mesI,
        countryP,
        countryI,
        causeP,
        causeI,
        region,
        country,
        cause,
        causeName = {
            'Behavior': 'Behavior',
            'Social Circumstances': 'Social Circumstances',
            'Genetics & Biology': 'Genetics Biology',
            'Medical Care': 'Medical Care',
            'Health Literacy': 'Health Literacy',
            'Access': 'Access',
            'Environment': 'Environment'
        };

    for (region in data) {
        if (data.hasOwnProperty(region)) {
            regionVal = 0;
            regionP = {
                id: 'id_' + regionI,
                name: region,
                //color: Highcharts.getOptions().colors[regionI]
            };
            countryI = 0;
            for (country in data[region]) {
                if (data[region].hasOwnProperty(country)) {
                    countryP = {
                        id: regionP.id + '_' + countryI,
                        name: country,
                        // color: Highcharts.getOptions().colors[countryI],
                        parent: regionP.id
                    };
                    points.push(countryP);
                    mesI = 0
                  for(mes in data[region][country]) {
                      if(data[region][country].hasOwnProperty(mes)) {
                        mesP = {
                            id: countryP.id + '_' + mesI,
                            name: mes,
                            // color: Highcharts.getOptions().colors[mesI],
                            parent: countryP.id
                        }
                        points.push(mesP)
                        causeI = 0
                        for (cause in data[region][country][mes]) {
                            if (data[region][country][mes].hasOwnProperty(cause)) {
                                causeP = {
                                    id: mesP.id + '_' + causeI,
                                    name: causeName[cause],
                                    parent: mesP.id,
                                    color: Highcharts.getOptions().colors[causeI],
                                    value: (+data[region][country][mes][cause])
                                };
                                regionVal += causeP.value;
                                points.push(causeP);
                                causeI = causeI + 1;
                            }
                        }
                        mesI = mesI + 1;                   
                      }
                  }
                  countryI = countryI + 1
                }
            }
            regionP.value = Math.round(regionVal / (mesI + countryI));
            points.push(regionP);
            regionI = regionI + 1;
        }
    }
    Highcharts.chart('container', {
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            allowDrillToNode: true,
            animationLimit: 1000,
            dataLabels: {
                enabled: false
            },
            levelIsConstant: false,
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true,
                    color:'black'
                    
                },
                borderWidth: 3,
            }, {
                level: 2,
                dataLabels: {
                    enabled: false,
                    
                },
                colorVariation: {
                    key: 'brightness',
                    to: -0.5
                }
            },
            {
                level: 3,
                dataLabels: {
                    enabled: false,
                    
                    
                },
                colorVariation: {
                    key: 'brightness',
                    to: -0.5
                }
            }, 
            {
                level: 4,
                dataLabels: {
                    enabled: false,
                    
                },
                colorVariation: {
                    key: 'brightness',
                    to: -0.5
                }
            }],
            data: points
        }],
        subtitle: {
            text: 'Pacientes'
        },
        title: {text: ""}
    });

});
