import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.css"],
})
export class CockpitComponent implements OnInit {
  // Creating custom events using EventEmitter
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>;
  // newServerContent = "";
  // Access the local reference from the HTML template using ViewChild decorator
  @ViewChild("serverContentInput", { static: true }) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  onAddServer(serverNameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serverNameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(serverContentInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: serverContentInput.value,
      serverContent: this.serverContentInput.nativeElement.value

    });
  }
}
