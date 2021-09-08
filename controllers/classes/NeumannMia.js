let missing = true;

class MIA {
  static dailyReport() {
      const msg = `NEUMANN MIA - REPORTE DIARIO:\n` + MIA.timeElapsed();
  }

  static timeElapsed() {
    var ms = new Date() - new Date("2021-07-26T03:12:00");
    var secs = ms / 1000;
    var minutes = secs / 60;
    secs = Math.floor(secs % 60);
    var hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    var days = Math.floor(hours / 24);
    hours = Math.floor(hours % 24);
  
    return `Neumann lleva ${days} dia(s), ${hours} hora(s), ${minutes} minuto(s), ${secs} segundo(s) desaparecido.`;
  }

  static isMissing(_missing = true) {
    missing = _missing;
    return missing;
  }

  static stillMissing(){
      return 'NEUMANN SIGUE DESAPARECIDO? ... ' + (this.isMissing() ? 'SI 😭' : 'NO 🥳🎉');
  }
}

module.exports = MIA;
