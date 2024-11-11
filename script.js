import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

interface Team {
  name: string
  manager: string
}

interface Match {
  team1: Team
  team2: Team
  score1?: number
  score2?: number
}

interface Round {
  name: string
  matches: Match[]
}

const initialTeams: Team[] = [
  { name: "Bovaa", manager: "Bavly mounir" },
  { name: "Verinaaaaa", manager: "Verinaa adel" },
  { name: "بابا الشغلانة", manager: "سيف البير" },
  { name: "Philo", manager: "Philo emil" },
  { name: "Bavlos ⚡", manager: "Bavly aziz ⚡" },
  { name: "Dr3m", manager: "youssef hany" },
  { name: "Blues FC", manager: "romany" },
  { name: "Bo4kaa4", manager: "Bishoy emad" },
]

export default function FantasyCupBracket() {
  const [rounds, setRounds] = useState<Round[]>([
    {
      name: "Quarter-Finals",
      matches: [
        { team1: initialTeams[0], team2: initialTeams[7] },
        { team1: initialTeams[1], team2: initialTeams[6] },
        { team1: initialTeams[2], team2: initialTeams[5] },
        { team1: initialTeams[3], team2: initialTeams[4] },
      ],
    },
    {
      name: "Semi-Finals",
      matches: [
        { team1: { name: "TBD", manager: "" }, team2: { name: "TBD", manager: "" } },
        { team1: { name: "TBD", manager: "" }, team2: { name: "TBD", manager: "" } },
      ],
    },
    {
      name: "Final",
      matches: [
        { team1: { name: "TBD", manager: "" }, team2: { name: "TBD", manager: "" } },
      ],
    },
  ]);

  const [activeSection, setActiveSection] = useState(0);

  const updateScore = (roundIndex: number, matchIndex: number, team: 'team1' | 'team2', score: number) => {
    setRounds(prevRounds => {
      const newRounds = [...prevRounds];
      newRounds[roundIndex].matches[matchIndex][team === 'team1' ? 'score1' : 'score2'] = score;
      return newRounds;
    });
  }

  const advanceWinner = (roundIndex: number, matchIndex: number) => {
    if (roundIndex >= rounds.length - 1) return; // Don't advance from the final

    const match = rounds[roundIndex].matches[matchIndex];
    if (match.score1 === undefined || match.score2 === undefined) return;

    const winner = match.score1 > match.score2 ? match.team1 : match.team2;
    const nextRoundMatchIndex = Math.floor(matchIndex / 2);
    const nextRoundTeamIndex = matchIndex % 2 === 0 ? 'team1' : 'team2';

    setRounds(prevRounds => {
      const newRounds = [...prevRounds];
      newRounds[roundIndex + 1].matches[nextRoundMatchIndex][nextRoundTeamIndex] = winner;
      return newRounds;
    });
  }

  const handleSectionChange = (index: number) => {
    setActiveSection(index);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Fantasy Cup Bracket</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around mb-4">
          {rounds.map((round, index) => (
            <Button key={round.name} onClick={() => handleSectionChange(index)} className={`mx-2 ${activeSection === index ? 'bg-blue-500 text-white' : ''}`}>
              {round.name}
            </Button>
          ))}
        </ div>
        <div className="flex flex-col md:flex-row justify-around items-start gap-4">
          {rounds[activeSection].matches.map((match, matchIndex) => (
            <Card key={`${rounds[activeSection].name}-${matchIndex}`} className="mb-4 p-2">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{match.team1.name}</span>
                  <input
                    type="number"
                    value={match.score1 ?? ''}
                    onChange={(e) => updateScore(activeSection, matchIndex, 'team1', parseInt(e.target.value))}
                    className="w-12 text-center border rounded"
                    min="0"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{match.team2.name}</span>
                  <input
                    type="number"
                    value={match.score2 ?? ''}
                    onChange={(e) => updateScore(activeSection, matchIndex, 'team2', parseInt(e.target.value))}
                    className="w-12 text-center border rounded"
                    min="0"
                  />
                </div>
                {activeSection < rounds.length - 1 && (
                  <Button 
                    onClick={() => advanceWinner(activeSection, matchIndex)}
                    className="mt-2"
                    disabled={match.score1 === undefined || match.score2 === undefined}
                  >
                    Advance Winner
                  </Button>
                )}
                {activeSection === rounds.length - 1 && match.score1 !== undefined && match.score2 !== undefined && (
                  <div className="flex items-center justify-center mt-2 text-yellow-500">
                    <Trophy className="mr-2" />
                    <span className="font-bold">
                      Winner: {match.score1 > match.score2 ? match.team1.name : match.team2.name}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
