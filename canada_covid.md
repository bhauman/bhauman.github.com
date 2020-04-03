---
layout: covid
title: Canada COVID-19 by Province
---

# Canada COVID-19 Charting

These charts track the progress of COVID-19 in Canada by province and should be updated daily at 8pm EST.

The data is sourced from the [Johns Hopkins University Center for
Systems Science and
Engineering](https://github.com/CSSEGISandData/COVID-19).

These charts are inspired by the excellent COVID-19 charts created by the
[Financial Times](https://www.ft.com/coronavirus-latest). 

You can look at the charts for [the US here](/usa_covid).

### Canada compared to other countries

Looking at 9 different countries to see how the Canada compares.

In this *new cases per week graph* each point represents a sum of
cases over the last seven days. Each succesive point moves this 7 day
sum one day over droping the first day and adding the current
day. This moving sum smooths out the curve and helps provide a better
indicator as to wether the curve is flattening.

<canvas id="country-confirmed-new-cases-week-window" width="770" height="577"></canvas>
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

<canvas id="country-confirmed" width="770" height="577"></canvas>
<br/>

### Canada by province

The *new cases per week* graph below is much like the one at the top of this page
except that it compares Canadian provinces instead of countries.

<canvas id="canada-confirmed-new-cases-week-window" width="770" height="577"></canvas>
<br/>

Let's also look at cumulative cases in the provinces, again measuring
the total confirmed cases over time.

<canvas id="canada-confirmed" width="770" height="577"></canvas>

<div class="row">
	<div class="col-md-5">
		<div class="checkbox">
			<label for="canada-confirmed_log-scale-button">
				<input type="checkbox" id="canada-confirmed_log-scale-button" name="canada-confirmed_log-scale-button" checked="true"> logarithmic scale
			</label>
		</div>
	</div>
	<div class="col-md-7">
		<div class="checkbox">
			<label for="canada-confirmed_zero-button">
				<input type="checkbox" id="canada-confirmed_zero-button" name="canada-confirmed_zero-button" checked="true"> start from first day with confirmed cases
			</label>
		</div>
	</div>
</div>
<!--
<input type="checkbox" id="canada-confirmed_log-scale-button" name="canada-confirmed-log_scale-button" checked="true">
<label for="canada-confirmed_log-scale-button">log scale</label><br>
<input type="checkbox" id="canada-confirmed_zero-button" name="canada-confirmed_zero-button" checked="true">
<label for="canada-confirmed_zero-button">from zero</label><br>
-->
<br/>
<canvas id="canada-confirmed-per-capita" width="770" height="577"></canvas>

<div class="row">
	<div class="col-md-5">
		<div class="checkbox">
			<label for="canada-confirmed-per-capita_log-scale-button">
				<input type="checkbox" id="canada-confirmed-per-capita_log-scale-button" name="canada-confirmed-per-capita_log-scale-button" checked="true"> logarithmic scale
			</label>
		</div>
	</div>
	<div class="col-md-7">
		<div class="checkbox">
			<label for="canada-confirmed-per-capita_zero-button">
				<input type="checkbox" id="canada-confirmed-per-capita_zero-button" name="canada-confirmed-per-capita_zero-button" checked="true"> start from first day with confirmed cases
			</label>
		</div>
	</div>
</div>
<!--
<img width="100%" src="/assets/images/covid_charts/CanadaConfirmedZeroStartLogScale.png"/>

<img width="100%" src="/assets/images/covid_charts/CanadaConfirmedZeroStart.png"/>

<img width="100%" src="/assets/images/covid_charts/CanadaConfirmed.png"/>

<img width="100%" src="/assets/images/covid_charts/CanadaConfirmedLogScale.png"/>

<img width="100%" src="/assets/images/covid_charts/CanadaPerCapita.png"/>

<img width="100%" src="/assets/images/covid_charts/CanadaPerCapitaZeroStart.png"/>
-->
<script src="/assets/covid-charts.js"></script>

<div style="height:100px"></div>



