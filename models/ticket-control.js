import path from 'path';
import fs from 'fs';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const { date, tickets, last, last4 } = JSON.parse(
  await readFile(new URL('../db/data.json', import.meta.url))
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class Ticket {
  constructor(number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.date = new Date().toLocaleDateString('es-gt');
    this.tickets = [];
    this.last4 = [];

    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      date: this.date,
      tickets: this.tickets,
      last4: this.last4,
    };
  }

  init() {
    if (date === this.date) {
      this.tickets = tickets;
      this.last = last;
      this.last4 = last4;
    } else {
      // another daty
      this.saveDB();
    }
  }

  saveDB() {
    const dbPath = path.join(__dirname, '../db/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  nextTicket() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveDB();
    return `Ticket ${ticket.number}`;
  }

  serveTicket(desktop) {
    // if no tickets in queue
    if (this.tickets.length === 0) {
      return null;
    }

    const ticket = this.tickets.shift();
    ticket.desktop = desktop;

    this.last4.unshift(ticket);

    if (this.last4.length > 4) {
      this.last4.splice(-1, 1);
    }

    this.saveDB();

    return ticket;
  }
}

export default TicketControl;
