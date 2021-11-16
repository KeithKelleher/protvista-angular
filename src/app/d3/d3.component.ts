import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements AfterViewInit {

  @ViewChild('donutChartTarget', {static: false}) chartContainer!: ElementRef;
  constructor(private changeRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.drawChart();
  }
  drawChart(): void {
    const measurements: { radA: number, radB: number, dist: number, thetaA: number, thetaB: number } = {
      radA: 100,
      radB: 100,
      dist: 1,
      thetaA: 1,
      thetaB: 2
    };

    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('svg').remove();
    const width = 400;
    const height = 200;
    const svg = d3.select(element).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('class', 'venn-container');
    svg.append('g')
      .attr('class', 'sets');
    svg.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const circleB = svg.append('circle')
      .style('fill', 'pink')
      .attr('cx', measurements.dist * 100 / 2)
      .attr('cy', 0)
      .attr('r', measurements.radB * 1)
      .style('pointer-events', 'all');

    const circleA = svg.append('circle')
      .style('fill', 'cyan')
      .attr('cx', -measurements.dist * 100 / 2)
      .attr('cy', 0)
      .attr('r', measurements.radA * 1);

    this.changeRef.detectChanges();

  }
}
