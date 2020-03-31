---
layout: covid
title: Canada COVID-19 by Province
---

# Canada COVID-19 by Province

These charts track the progress of COVID-19 in Canada by province and should be updated daily at 8pm EST.

The data is sourced from the [Johns Hopkins University Center for
Systems Science and
Engineering](https://github.com/CSSEGISandData/COVID-19).

These charts are inspired by the excellent COVID-19 charts created by the
[Financial Times](https://www.ft.com/coronavirus-latest). To see
Canada's relationship to other countries that is a good place to start.

<canvas id="canada-confirmed" width="770" height="577"></canvas>

<div class="row">
	<div class="col-md-5">
		<div class="checkbox">
			<label for="canada-confirmed_log-scale-button">
				<input type="checkbox" id="canada-confirmed_log-scale-button" name="canada-confirmed_log-scale-button" checked="true"> logarithmic scale
			</label>
		</div>
	</div>
	<div class="col-md-5">
		<div class="checkbox">
			<label for="canada-confirmed_zero-button">
				<input type="checkbox" id="canada-confirmed_zero-button" name="canada-confirmed_zero-button" checked="true"> start from first day with zero cases
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
	<div class="col-md-5">
		<div class="checkbox">
			<label for="canada-confirmed-per-capita_zero-button">
				<input type="checkbox" id="canada-confirmed-per-capita_zero-button" name="canada-confirmed-per-capita_zero-button" checked="true"> start from first day with zero cases
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



