---
layout: covid
title: US COVID-19 by State
---

# Charting COVID-19 in the United States

<i>updated on <b><span id="current-date">waiting ...</span></b></i>

These charts track the progress of COVID-19 in the United States by state and should be updated daily at 8pm EST.

The data is sourced from the [Johns Hopkins University Center for
Systems Science and
Engineering](https://github.com/CSSEGISandData/COVID-19).

These charts are inspired by the excellent COVID-19 charts created by the
[Financial Times](https://www.ft.com/coronavirus-latest). 

You can look at the charts for [Canada here](/canada_covid).

### US compared to other countries

Looking at 9 different countries to see how the US compares.

In this *new cases per week graph* each point represents a sum of
cases over the last seven days. Each succesive point moves this 7 day
sum one day over droping the first day and adding the current
day. This moving sum smooths out the curve and helps provide a better
indicator as to wether the curve is flattening.

<canvas id="usa-country-confirmed-new-cases-week-window" width="770" height="577"></canvas>
<br/>

The lines in the graph above will flatten and curve downward as the
new cases slow down and reduce for the given country. Look to line for
South Korea as a good example of this. Keep in mind that South Korea
has had recent experience with epidemics and was extremely agressive
with testing.

We are using a logarithmic scale because it reveals the trajectory of
the spread more clearly.  Take note that values on the Y axis increase
exponentially.

As you look at the cumulative cases graph below keep in mind that as
the new cases slow down the curve will only flatten as its doing for
South Korea.

<canvas id="usa-confirmed-countries" width="770" height="577"></canvas>
<br/>

### Looking at the States

In that graphs below the states are grouped by population to so that
the graphs can be read more clearly.

For each group of states there is a *new cases per week* graph and a
*cumulative cases* graph just like the graphs of above, except here we
are comparing states.

Keep in mind the accuracy of these numbers is questionable given the
poor state of testing in the US but this should improve over time.

### 10 States with most population (over 9 million)

<canvas id="usa-confirmed-new-cases-week-window" width="770" height="577"></canvas>
<br/>

<canvas id="usa-confirmed" width="770" height="577"></canvas>
<br/>

### States with populations from 5.8 million upto 9 million

<canvas id="usa2-confirmed-new-cases-week-window" width="770" height="577"></canvas>
<br/>

<canvas id="usa2-confirmed" width="770" height="577"></canvas>
<br/>

### States with populations from 3.5 million upto 5.8 million

<canvas id="usa3-confirmed-new-cases-week-window" width="770" height="577"></canvas>
<br/>

<canvas id="usa3-confirmed" width="770" height="577"></canvas>
<br/>

### States with populations from 1.4 million upto 3.3 million

<canvas id="usa4-confirmed-new-cases-week-window" width="770" height="577"></canvas>
<br/>

<canvas id="usa4-confirmed" width="770" height="577"></canvas>
<br/>

### States with populations under 1.4 million

<canvas id="usa5-confirmed-new-cases-week-window" width="770" height="577"></canvas>
<br/>

<canvas id="usa5-confirmed" width="770" height="577"></canvas>
<br/>

<!-- <canvas id="usa6-confirmed-new-cases-week-window" width="770" height="577"></canvas>
<br/> -->


### Canada

You can look at the charts for [Canada here](/canada_covid)


<script src="/assets/covid-charts-usa.js"></script>

<div style="height:100px"></div>



