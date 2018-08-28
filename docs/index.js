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
                color: Highcharts.getOptions().colors[regionI]
                //color: Highcharts.getOptions().colors[countryI]
                
            };
            countryI = 0;
            for (country in data[region]) {
                if (data[region].hasOwnProperty(country)) {
                    countryP = {
                        id: regionP.id + '_' + countryI,
                        name: country,
                        parent: regionP.id
                    };
                    points.push(countryP);
                    mesI = 0
                  for(mes in data[region][country]) {
                      if(data[region][country].hasOwnProperty(mes)) {
                        mesP = {
                            id: countryP.id + '_' + mesI,
                            name: mes,
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
                    enabled: true
                },
                borderWidth: 3
            }],
            data: points
        }],
        subtitle: {
            text: 'Pacientes'
        },
        title: {
            text: 'Visualização de Dados na Saúde'
        }
    });

});