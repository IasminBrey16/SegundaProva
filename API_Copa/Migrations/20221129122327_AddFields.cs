using Microsoft.EntityFrameworkCore.Migrations;

namespace API_Copa.Migrations
{
    public partial class AddFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PontuacaoSelecaoA",
                table: "Jogos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PontuacaoSelecaoB",
                table: "Jogos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PontuacaoSelecaoA",
                table: "Jogos");

            migrationBuilder.DropColumn(
                name: "PontuacaoSelecaoB",
                table: "Jogos");
        }
    }
}
