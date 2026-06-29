import type { CEFRLevel } from "@/lib/utils"

export type WordCategoryGeneral =
  | "daily-life"
  | "travel"
  | "food-drink"
  | "emotions"
  | "health"
  | "social"
  | "business-general"
  | "phrasal-verbs"
  | "idioms"

export interface VocabularyWordGeneral {
  id: string
  word: string
  phonetic: string
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb" | "phrase" | "phrasal-verb" | "idiom" | "abbreviation"
  definition: string
  exampleSentence: string
  category: WordCategoryGeneral
  level: CEFRLevel
  tags: string[]
  synonyms: string[]
}

export const CATEGORY_META_GENERAL: Record<WordCategoryGeneral, { label: string; color: string; bg: string; border: string }> = {
  "daily-life":       { label: "Daily Life",        color: "text-sky-400",     bg: "bg-sky-400/10",     border: "border-sky-400/25" },
  "travel":           { label: "Travel",             color: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/25" },
  "food-drink":       { label: "Food & Drink",       color: "text-orange-400",  bg: "bg-orange-400/10",  border: "border-orange-400/25" },
  "emotions":         { label: "Emotions",           color: "text-pink-400",    bg: "bg-pink-400/10",    border: "border-pink-400/25" },
  "health":           { label: "Health",             color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/25" },
  "social":           { label: "Social",             color: "text-violet-400",  bg: "bg-violet-400/10",  border: "border-violet-400/25" },
  "business-general": { label: "Business",           color: "text-brand-400",   bg: "bg-brand-400/10",   border: "border-brand-400/25" },
  "phrasal-verbs":    { label: "Phrasal Verbs",      color: "text-purple-400",  bg: "bg-purple-400/10",  border: "border-purple-400/25" },
  "idioms":           { label: "Idioms",             color: "text-rose-400",    bg: "bg-rose-400/10",    border: "border-rose-400/25" },
}

type POS = VocabularyWordGeneral["partOfSpeech"]
const w = (
  id: string, word: string, phonetic: string, pos: POS,
  def: string, example: string, cat: WordCategoryGeneral, level: CEFRLevel,
  tags: string[], synonyms: string[]
): VocabularyWordGeneral => ({ id, word, phonetic, partOfSpeech: pos, definition: def, exampleSentence: example, category: cat, level, tags, synonyms })

export const vocabularyGeneral: VocabularyWordGeneral[] = [

  // ═══════════════════════════════════════════════════
  // DAILY LIFE
  // ═══════════════════════════════════════════════════
  w("dl-commute",       "commute",          "/kəˈmjuːt/",          "noun",    "The regular journey between home and work or school.",                                        "My commute takes about 45 minutes by train each morning.",                          "daily-life", "A2", ["transport","routine"],      ["journey","travel","trip"]),
  w("dl-errand",        "errand",           "/ˈɛrənd/",            "noun",    "A short trip made to perform a specific practical task.",                                      "I need to run a few errands before the shops close.",                               "daily-life", "B1", ["routine","tasks"],          ["task","chore","trip"]),
  w("dl-chore",         "chore",            "/tʃɔːr/",             "noun",    "A routine household task such as cleaning or washing.",                                        "We share the chores equally between the two of us.",                                "daily-life", "A2", ["home","routine"],           ["task","duty","job"]),
  w("dl-landlord",      "landlord",         "/ˈlændlɔːrd/",        "noun",    "A person who owns a property and rents it out to tenants.",                                    "I need to contact my landlord about the broken heating.",                            "daily-life", "B1", ["housing","renting"],         ["owner","proprietor"]),
  w("dl-utility",       "utility bill",     "/juːˈtɪlɪti bɪl/",   "phrase",  "A bill for essential services such as electricity, gas, or water.",                           "My utility bills are much higher in winter.",                                        "daily-life", "B1", ["housing","money"],           ["energy bill","service charge"]),
  w("dl-budget",        "budget",           "/ˈbʌdʒɪt/",           "noun",    "A plan for managing income and expenditure over a set period.",                                "I try to stick to a monthly budget to save more money.",                            "daily-life", "B1", ["money","planning"],          ["plan","allowance","funds"]),
  w("dl-appointment",   "appointment",      "/əˈpɔɪntmənt/",       "noun",    "A prearranged meeting or visit at a specific time.",                                           "I have a dentist appointment at 3 pm tomorrow.",                                    "daily-life", "A2", ["schedule","meetings"],       ["meeting","booking","visit"]),
  w("dl-schedule",      "schedule",         "/ˈʃɛdjuːl/",          "noun",    "A plan showing the times and order of planned activities.",                                    "Let me check my schedule before confirming the meeting.",                           "daily-life", "A2", ["planning","time"],           ["timetable","agenda","plan"]),
  w("dl-neighbourhood", "neighbourhood",    "/ˈneɪbərhʊd/",        "noun",    "The area and community surrounding where someone lives.",                                      "It's a quiet neighbourhood with lots of parks and cafés.",                          "daily-life", "A2", ["housing","community"],       ["area","district","locality"]),
  w("dl-grocery",       "grocery",          "/ˈɡroʊs(ə)ri/",       "noun",    "Food and household goods bought from a supermarket or shop.",                                  "I forgot to add milk to my grocery list.",                                          "daily-life", "A1", ["shopping","food"],           ["shopping","provisions","supplies"]),

  // ═══════════════════════════════════════════════════
  // TRAVEL
  // ═══════════════════════════════════════════════════
  w("tr-itinerary",     "itinerary",        "/aɪˈtɪnəreri/",       "noun",    "A detailed plan or route for a journey.",                                                       "Our travel agent prepared a full itinerary for the two-week trip.",                 "travel", "B1", ["planning","trip"],           ["plan","route","schedule"]),
  w("tr-layover",       "layover",          "/ˈleɪˌoʊvər/",        "noun",    "A stop or break during a journey, especially a wait between flights.",                          "We have a three-hour layover in Amsterdam before flying to New York.",              "travel", "B1", ["flights","airport"],         ["stopover","connection","transit"]),
  w("tr-boarding",      "boarding pass",    "/ˈbɔːrdɪŋ pæs/",      "phrase",  "A document or digital ticket that allows a passenger to board a plane.",                        "Please have your boarding pass ready at the gate.",                                 "travel", "A2", ["flights","airport"],         ["ticket","e-ticket"]),
  w("tr-customs",       "customs",          "/ˈkʌstəmz/",          "noun",    "The official process of checking goods and documents when entering a country.",                  "We spent 30 minutes going through customs after landing.",                          "travel", "A2", ["airport","border"],          ["border control","immigration"]),
  w("tr-accommodation", "accommodation",    "/əˌkɒməˈdeɪʃn/",      "noun",    "A place to stay, such as a hotel, hostel, or rented apartment.",                               "We're still looking for accommodation near the city centre.",                       "travel", "A2", ["hotels","housing"],          ["lodging","stay","housing"]),
  w("tr-sightseeing",   "sightseeing",      "/ˈsaɪtˌsiːɪŋ/",       "noun",    "The activity of visiting interesting or famous places as a tourist.",                           "We spent the afternoon sightseeing and visited three museums.",                      "travel", "A2", ["tourism","leisure"],         ["tourism","exploring","visiting"]),
  w("tr-jetlag",        "jet lag",          "/ˈdʒɛt læɡ/",         "phrase",  "Physical tiredness and disorientation caused by travelling across time zones.",                  "I was suffering from jet lag for two days after the long-haul flight.",             "travel", "B1", ["flights","health"],          ["fatigue","exhaustion"]),
  w("tr-currency",      "currency exchange","ˈkɜːrənsi ɪksˈtʃeɪndʒ/","phrase","The conversion of money from one currency to another.",                                        "I got a poor rate at the airport currency exchange.",                               "travel", "B1", ["money","banking"],           ["forex","money conversion"]),
  w("tr-excess",        "excess baggage",   "/ˈɛksɛs ˈbæɡɪdʒ/",   "phrase",  "Luggage that exceeds the weight or size limit allowed by an airline.",                          "I had to pay a fee for excess baggage at check-in.",                                "travel", "B1", ["flights","luggage"],         ["overweight luggage","extra luggage"]),
  w("tr-roundtrip",     "round trip",       "/raʊnd trɪp/",        "phrase",  "A journey to a destination and back to the starting point.",                                    "A round trip ticket to Paris is cheaper if you book early.",                        "travel", "A2", ["flights","booking"],         ["return journey","return ticket"]),

  // ═══════════════════════════════════════════════════
  // FOOD & DRINK
  // ═══════════════════════════════════════════════════
  w("fd-appetizer",     "appetizer",        "/ˈæpɪˌtaɪzər/",       "noun",    "A small dish served before the main course to stimulate appetite.",                             "We ordered a shared appetizer while waiting for our mains.",                        "food-drink", "A2", ["restaurant","meals"],     ["starter","entrée"]),
  w("fd-takeaway",      "takeaway",         "/ˈteɪkəˌweɪ/",        "noun",    "Food prepared by a restaurant and taken away to be eaten elsewhere.",                           "We ordered a takeaway because we didn't feel like cooking.",                        "food-drink", "A1", ["restaurant","food"],      ["takeout","delivery"]),
  w("fd-cuisine",       "cuisine",          "/kwɪˈziːn/",          "noun",    "A style or method of cooking associated with a particular region or culture.",                   "I love trying different cuisines when I travel.",                                   "food-drink", "B1", ["culture","food"],          ["food","cooking style"]),
  w("fd-portion",       "portion",          "/ˈpɔːrʃən/",          "noun",    "The amount of food served to one person.",                                                       "The portions here are huge — I couldn't finish my plate.",                          "food-drink", "A2", ["restaurant","quantity"],  ["serving","helping"]),
  w("fd-savory",        "savory",           "/ˈseɪvəri/",          "adjective","Having a salty or spicy flavour rather than sweet.",                                            "I prefer savory snacks like cheese and crackers.",                                  "food-drink", "B1", ["taste","food"],            ["salty","spicy"]),
  w("fd-reservation",   "reservation",      "/ˌrɛzərˈveɪʃən/",     "noun",    "An advance booking of a table at a restaurant or a room at a hotel.",                           "I made a reservation for two at 8 pm.",                                             "food-drink", "A2", ["restaurant","booking"],   ["booking","table"]),
  w("fd-bill",          "bill",             "/bɪl/",               "noun",    "A list of charges for food, drinks, or services received.",                                     "Could we have the bill, please?",                                                   "food-drink", "A1", ["restaurant","money"],     ["check","invoice"]),
  w("fd-recipe",        "recipe",           "/ˈrɛsɪpi/",           "noun",    "A set of instructions for preparing and cooking a dish.",                                        "This is my grandmother's recipe for apple pie.",                                    "food-drink", "A2", ["cooking","food"],          ["instructions","method"]),

  // ═══════════════════════════════════════════════════
  // EMOTIONS
  // ═══════════════════════════════════════════════════
  w("em-frustrated",    "frustrated",       "/frʌˈstreɪtɪd/",      "adjective","Feeling upset or annoyed because of an inability to achieve or change something.",             "I get frustrated when people interrupt me mid-sentence.",                           "emotions", "A2", ["feelings","negative"],     ["annoyed","irritated","exasperated"]),
  w("em-overwhelmed",   "overwhelmed",      "/ˌoʊvərˈwɛlmd/",      "adjective","Feeling buried under too much to cope with at once.",                                          "I felt completely overwhelmed by all the work during the exam period.",              "emotions", "B1", ["feelings","stress"],        ["swamped","buried","stressed"]),
  w("em-relieved",      "relieved",         "/rɪˈliːvd/",          "adjective","Feeling glad and free from worry after a stressful situation resolves.",                        "I was so relieved when I passed the driving test.",                                 "emotions", "A2", ["feelings","positive"],      ["reassured","comforted"]),
  w("em-anxious",       "anxious",          "/ˈæŋkʃəs/",           "adjective","Feeling worried or nervous about an uncertain outcome.",                                        "She felt anxious before giving her first public speech.",                            "emotions", "B1", ["feelings","stress"],        ["nervous","worried","uneasy"]),
  w("em-enthusiastic",  "enthusiastic",     "/ɪnˌθjuːziˈæstɪk/",  "adjective","Showing great excitement, eagerness, or interest.",                                             "He was very enthusiastic about the new project.",                                   "emotions", "B1", ["feelings","positive"],      ["eager","excited","passionate"]),
  w("em-embarrassed",   "embarrassed",      "/ɪmˈbærəst/",         "adjective","Feeling ashamed or self-conscious in front of others.",                                         "I was embarrassed when I called my teacher by the wrong name.",                     "emotions", "A2", ["feelings","social"],        ["ashamed","self-conscious"]),
  w("em-grateful",      "grateful",         "/ˈɡreɪtfəl/",         "adjective","Feeling or showing thanks for something received or done.",                                     "I'm really grateful for all the help you gave me.",                                 "emotions", "A2", ["feelings","positive"],      ["thankful","appreciative"]),
  w("em-confident",     "confident",        "/ˈkɒnfɪdənt/",        "adjective","Feeling certain and assured about one's own abilities.",                                        "She walked into the interview feeling confident and well-prepared.",                 "emotions", "B1", ["feelings","positive"],      ["self-assured","positive","bold"]),

  // ═══════════════════════════════════════════════════
  // HEALTH
  // ═══════════════════════════════════════════════════
  w("he-prescription",  "prescription",     "/prɪˈskrɪpʃən/",      "noun",    "A doctor's written instruction to a pharmacist to prepare a specific medicine.",                "I need to pick up my prescription from the pharmacy.",                              "health", "B1", ["medical","medicine"],      ["medication order","script"]),
  w("he-symptom",       "symptom",          "/ˈsɪmptəm/",          "noun",    "A sign or indication of an illness or health problem.",                                          "A high temperature is a common symptom of the flu.",                                "health", "B1", ["medical","illness"],       ["sign","indication"]),
  w("he-diagnosis",     "diagnosis",        "/ˌdaɪəɡˈnoʊsɪs/",     "noun",    "The identification of an illness or condition by a medical professional.",                       "The doctor confirmed the diagnosis after reviewing the test results.",               "health", "B2", ["medical","illness"],       ["assessment","identification"]),
  w("he-recovery",      "recovery",         "/rɪˈkʌvəri/",         "noun",    "The process of becoming healthy again after an illness or injury.",                              "His recovery from the surgery was quicker than expected.",                          "health", "B1", ["medical","wellness"],      ["recuperation","healing"]),
  w("he-allergic",      "allergic",         "/əˈlɜːrdʒɪk/",        "adjective","Having an adverse reaction to a specific substance.",                                           "I'm allergic to penicillin, so please prescribe an alternative.",                   "health", "B1", ["medical","conditions"],    ["sensitive","reactive"]),
  w("he-checkup",       "check-up",         "/ˈtʃɛkˌʌp/",          "noun",    "A routine medical examination to assess general health.",                                        "I have an annual check-up with my doctor every spring.",                            "health", "A2", ["medical","routine"],       ["examination","medical","screening"]),
  w("he-pharmacy",      "pharmacy",         "/ˈfɑːrməsi/",         "noun",    "A shop or place where medicines and health products are dispensed.",                             "The pharmacy is open until 9 pm on weekdays.",                                      "health", "A2", ["medical","shopping"],      ["chemist","drugstore"]),
  w("he-sideeffects",   "side effects",     "/saɪd ɪfɛkts/",       "phrase",  "Unintended effects of a medicine or treatment, often negative.",                                 "Please read the leaflet carefully as there are some side effects.",                  "health", "B1", ["medical","medicine"],      ["adverse effects","reactions"]),

  // ═══════════════════════════════════════════════════
  // SOCIAL
  // ═══════════════════════════════════════════════════
  w("so-acquaintance",  "acquaintance",     "/əˈkweɪntəns/",       "noun",    "A person you know slightly but not as a close friend.",                                          "She's not a close friend — more of an acquaintance from work.",                     "social", "B1", ["relationships","people"],  ["contact","associate"]),
  w("so-smalltalk",     "small talk",       "/smɔːl tɔːk/",        "phrase",  "Light, casual conversation about unimportant or uncontroversial topics.",                        "Making small talk at parties can help you feel more comfortable.",                   "social", "B1", ["conversation","etiquette"],["chit-chat","casual talk"]),
  w("so-compliment",    "compliment",       "/ˈkɒmplɪmənt/",       "noun",    "An expression of praise, admiration, or approval directed at someone.",                          "She paid me a lovely compliment about my presentation.",                            "social", "A2", ["conversation","positive"],  ["praise","compliment","flattery"]),
  w("so-networking",    "networking",       "/ˈnɛtwɜːrkɪŋ/",       "noun",    "The act of building and maintaining professional or social relationships.",                       "Networking events are a great way to meet people in your industry.",                 "social", "B2", ["professional","social"],    ["socialising","connecting"]),
  w("so-catchup",       "catch up",         "/kætʃ ʌp/",           "phrasal-verb","To have a conversation with someone you haven't spoken to in a while.",                     "Let's grab coffee and catch up — it's been months!",                                "social", "A2", ["conversation","friends"],   ["reconnect","meet up"]),
  w("so-gettogether",   "get-together",     "/ɡɛt təˈɡɛðər/",      "noun",    "An informal social meeting or gathering.",                                                        "We're organising a small get-together at our place on Saturday.",                   "social", "A2", ["social","events"],          ["gathering","meetup","party"]),

  // ═══════════════════════════════════════════════════
  // BUSINESS GENERAL
  // ═══════════════════════════════════════════════════
  w("bg-deadline",      "deadline",         "/ˈdɛdlaɪn/",          "noun",    "The latest time or date by which something must be completed.",                                  "We need to submit the report before Friday's deadline.",                            "business-general", "B1", ["work","time"],       ["due date","cutoff","limit"]),
  w("bg-feedback",      "feedback",         "/ˈfiːdbæk/",          "noun",    "Information or opinions given about the quality of someone's work or performance.",              "His manager gave him constructive feedback after the presentation.",                 "business-general", "B1", ["work","communication"],["review","evaluation","comments"]),
  w("bg-negotiate",     "negotiate",        "/nɪˈɡoʊʃieɪt/",      "verb",    "To discuss something in order to reach a mutual agreement.",                                     "We managed to negotiate a better price with the supplier.",                         "business-general", "B2", ["work","communication"],["discuss","bargain","deal"]),
  w("bg-collaborate",   "collaborate",      "/kəˈlæbəreɪt/",       "verb",    "To work jointly with others to achieve a shared goal.",                                          "The two departments collaborated closely on the product launch.",                    "business-general", "B2", ["work","teamwork"],    ["work together","partner","team up"]),
  w("bg-presentation",  "presentation",     "/ˌprɛzənˈteɪʃən/",    "noun",    "A formal talk or display of information given to an audience.",                                  "She prepared a clear and concise presentation for the investors.",                  "business-general", "B1", ["work","communication"],["talk","speech","pitch"]),
  w("bg-proposal",      "proposal",         "/prəˈpoʊzəl/",        "noun",    "A formal plan or suggestion put forward for consideration.",                                      "They submitted a proposal outlining the project timeline and budget.",               "business-general", "B2", ["work","planning"],    ["plan","offer","bid"]),
  w("bg-stakeholder",   "stakeholder",      "/ˈsteɪkˌhoʊldər/",    "noun",    "A person or group with an interest or concern in a business or project.",                        "We need to present the results to all key stakeholders next week.",                 "business-general", "C1", ["work","management"],  ["interested party","investor"]),

  // ═══════════════════════════════════════════════════
  // PHRASAL VERBS
  // ═══════════════════════════════════════════════════
  w("pv-bringup",       "bring up",         "/brɪŋ ʌp/",           "phrasal-verb","To mention or introduce a topic in conversation.",                                           "She brought up the issue of working hours during the meeting.",                     "phrasal-verbs", "B1", ["speaking","conversation"],["mention","raise","introduce"]),
  w("pv-carryon",       "carry on",         "/ˈkæri ɒn/",          "phrasal-verb","To continue doing something despite difficulties.",                                           "Despite the noise, we carried on with the lesson.",                                 "phrasal-verbs", "A2", ["general","action"],      ["continue","persist","keep going"]),
  w("pv-figureout",     "figure out",       "/ˈfɪɡər aʊt/",        "phrasal-verb","To understand, solve, or find an answer to something.",                                       "I can't figure out how to use this app.",                                           "phrasal-verbs", "B1", ["thinking","problem"],     ["work out","understand","solve"]),
  w("pv-giveup",        "give up",          "/ɡɪv ʌp/",            "phrasal-verb","To stop trying to do something because it seems too difficult.",                              "Don't give up — you're almost there!",                                              "phrasal-verbs", "A2", ["general","emotions"],    ["quit","abandon","stop"]),
  w("pv-lookforward",   "look forward to",  "/lʊk ˈfɔːrwərd tuː/", "phrasal-verb","To feel excited and pleased about something that will happen in the future.",                "I'm really looking forward to the holiday.",                                        "phrasal-verbs", "A2", ["emotions","future"],      ["anticipate","await","can't wait"]),
  w("pv-turndown",      "turn down",        "/tɜːrn daʊn/",        "phrasal-verb","To decline or refuse an offer, invitation, or request.",                                      "She turned down the job offer because the salary was too low.",                     "phrasal-verbs", "B1", ["communication","work"],   ["refuse","reject","decline"]),
  w("pv-putoff",        "put off",          "/pʊt ɒf/",            "phrasal-verb","To delay or postpone doing something.",                                                        "Stop putting off the assignment — the deadline is tomorrow.",                       "phrasal-verbs", "B1", ["time","general"],         ["postpone","delay","defer"]),
  w("pv-lookup",        "look up",          "/lʊk ʌp/",            "phrasal-verb","To search for information in a reference source such as a dictionary or website.",            "If you don't know the word, look it up in the dictionary.",                         "phrasal-verbs", "A2", ["learning","research"],    ["search","find","check"]),

  // ═══════════════════════════════════════════════════
  // IDIOMS
  // ═══════════════════════════════════════════════════
  w("id-weather",       "under the weather","/ˌʌndər ðə ˈwɛðər/",  "idiom",   "Feeling slightly ill or not in good health.",                                                    "I'm feeling a bit under the weather, so I might skip the gym today.",               "idioms", "B1", ["health","informal"],    ["unwell","not feeling well"]),
  w("id-icebreaker",    "break the ice",    "/breɪk ðə aɪs/",      "idiom",   "To do or say something to reduce tension and start a conversation in a new situation.",          "He told a joke to break the ice at the beginning of the meeting.",                  "idioms", "B1", ["social","conversation"],["start talking","ease tension"]),
  w("id-nail",          "hit the nail on the head","/hɪt ðə neɪl ɒn ðə hɛd/","idiom","To describe or identify something exactly correctly.",                                  "You hit the nail on the head — that's exactly what's wrong.",                       "idioms", "B2", ["communication","accuracy"],["be exactly right","spot on"]),
  w("id-bush",          "beat around the bush","/biːt əˈraʊnd ðə bʊʃ/","idiom","To avoid saying what you mean directly, often to delay an uncomfortable topic.",             "Stop beating around the bush and tell me what the problem is.",                     "idioms", "B2", ["communication","speaking"],["be indirect","avoid the topic"]),
  w("id-bullet",        "bite the bullet",  "/baɪt ðə ˈbʊlɪt/",    "idiom",   "To endure a painful or difficult situation with courage because it is unavoidable.",             "I hate going to the dentist, but I just bit the bullet and made an appointment.",   "idioms", "B2", ["courage","decisions"],  ["face it","endure","push through"]),
  w("id-armleg",        "cost an arm and a leg","/kɒst ən ɑːrm ənd ə lɛɡ/","idiom","To be extremely expensive.",                                                               "Flights to Tokyo cost an arm and a leg during the summer holidays.",                "idioms", "B1", ["money","informal"],    ["be very expensive","cost a fortune"]),
  w("id-fence",         "on the fence",     "/ɒn ðə fɛns/",        "idiom",   "Being undecided or neutral about something, not taking a definite position.",                    "I'm still on the fence about whether to accept the job offer.",                     "idioms", "B2", ["decisions","opinion"],  ["undecided","neutral","unsure"]),
]
