//=============================================================================
// VisuStella MZ - Aggro Control System
// VisuMZ_2_AggroControlSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AggroControlSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AggroControlSystem = VisuMZ.AggroControlSystem || {};
VisuMZ.AggroControlSystem.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.12] [AggroControlSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Aggro_Control_System_VisuStella_MZ
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A common mechanic found in many RPG's nowadays is the ability to steer the
 * way enemies target party members. This can be in the form of provocations, 
 * taunts, and aggro.
 *
 * Provocations come in the form of states, where when a unit applies a provoke
 * state on a target, the target must attack the provoker when using single
 * target skills. This plugin provides support for multiple provocations and
 * such provocations will be given focus based on the state's priority value.
 *
 * Taunts are a third way to steer an opponent to focus on a party member. The
 * taunt effects can be split up into global, physical, magical, or certain hit
 * only taunts and these can be applied to almost any trait object.
 *
 * Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Three different ways to influencing which targets enemies should attack:
 *   Provoke, taunt, and aggro.
 * * Provoke and taunt effects work both ways for actors and enemies.
 * * Aggro effects accumulate through battle and can be manipulated through
 *   notetag values, Plugin Commands, and/or Plugin Parameters.
 * * Provoked battlers can have provoke lines displayed to indicate which
 *   unit has provoked them.
 * * Taunting units can have animations played on them repeatedly to quickly
 *   relay information to the player about their taunt properties.
 * * Gauges that can be displayed over the heads of actor sprites to display
 *   how much aggro that actor holds in comparison to the other actors.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 * VisuMZ_1_BattleCore
 *
 * - Provoke Priority Lines and Taunt animations become available if these
 *   plugins are installed.
 *
 * ---
 *
 * ============================================================================
 * How Aggro, Provoke, and Taunts Work
 * ============================================================================
 *
 * This section will explain how aggro, provoke, and taunts work.
 *
 * ---
 *
 * Provoke
 *
 * - Provocations come in the form of states, where when a unit applies a
 * provoke state on a target, the target must attack the provoker when using
 * single target skills. This plugin provides support for multiple provocations
 * and such provocations will be given focus based on the state's database
 * priority value.
 *
 * - The provoke will last only as long as the duration of the state itself. If
 * the state's duration is refreshed by reapplying the Provoke state, then the
 * provoker of that state will then switch over to the one applying the newly
 * added state.
 *
 * - When an actor selects a target for an action and the actor is provoked by
 * an enemy on the other team, the player's choice selection becomes limited to
 * only the provoker.
 *
 * - Provoke can be bypassed through the <Bypass Provoke> notetag.
 *
 * ---
 *
 * Taunts
 *
 * - Taunts are a third way to steer an opponent to focus on a party member.
 * The taunt effects can be split up into global, physical, magical, or certain
 * hit only taunts and these can be applied to almost any trait object.
 *
 * - When an actor selects a target and the enemy team has a taunting unit,
 * the player's choice selection becomes limited to only the targets with the
 * associated taunt type.
 *
 * - Taunts can be bypassed through the <Bypass Taunt> notetag.
 *
 * ---
 *
 * Aggro
 *
 * - Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * - Skills and items can raise its user's aggro value through notetags and/or
 * how much damage they've dealt or healed. Skills and items can also change a
 * target's aggro value through notetags, too.
 *
 * - Through the Plugin Parameters, you can set Aggro to automatically raised
 * based on how much damage or healing dealt by a user.
 *
 * - Some enemies can be bypass forced aggro target through the <Bypass Aggro>
 * notetag while other enemies can be forced to target the highest aggro target
 * through the <Target Highest Aggro> notetag;
 *
 * ---
 *
 * Priorities
 *
 * - Priority will be given in the order of provokes, taunts, and then aggro.
 * This means if an enemy is provoked, the opposing side has a taunt, and there
 * is a member with high aggro, then the enemy will always attack the provoker
 * first before targeting a taunting unit before targeting the unit with high
 * aggro values.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Provoke-Related Notetags ===
 *
 * The following notetags enable you to utilize the Provoke effects added by
 * this plugin. Provoked targets can only attack the provoking unit for single
 * target actions.
 *
 * ---
 *
 * <Provoke>
 *
 * - Used for: State Notetags
 * - Causes the state affected unit to be able to only attack the caster of the
 *   provoke state for single target actions.
 * - If multiple provoke states are applied, then the provoker is the one who
 *   applied the highest priority provoke state.
 *
 * ---
 *
 * <Bypass Provoke>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Makes the affected unit to ignore any and all provoke effects applied by
 *   any provoke states, allowing them to target foes as if they are unaffected
 *   by provoke states altogether.
 *
 * ---
 * 
 * <Bypass Provoke>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass provoke effects applied by any provoke states,
 *   allowing this action to target foes as if the user is unaffected by any
 *   provoke effects altogether.
 * 
 * ---
 * 
 * <Provoke Height Origin: x%>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the provoke height origin point to x% of the sprite's height.
 * - This is the landing point for the provoke trails.
 * - Replace 'x' with a number presenting what rate of the sprite's height to
 *   set as the provoke height origin point.
 * 
 * ---
 *
 * === Taunt-Related Notetags ===
 *
 * ---
 *
 * <Taunt>
 * <All Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Physical Taunt>
 * <Magical Taunt>
 * <Certain Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions
 *   respectively.
 * - Add/remove any combination of the above to cause the affected unit to
 *   become the target of those types of actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Bypass Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The affected unit will ignore any and all taunt effects created by the
 *   opposing team, allowing them to use single target actions as if no
 *   taunters exist on the opposing team.
 *
 * ---
 * 
 * <Bypass Taunt>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass taunt effects created by the opposing team,
 *   allowing the user to use single target actions as if no taunters exist on
 *   the opposing team.
 * 
 * ---
 *
 * === Aggro-Related Notetags ===
 *
 * ---
 *
 * <User Aggro: +x>
 * <User Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the user's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <Target Aggro: +x>
 * <Target Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the target's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * <Aggro: +x>
 * <Aggro: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to passively have increased/decreased aggro
 *   values independent of the amount of aggro it earns in battle.
 * - Replace 'x' with the amount of aggro this object increases/decreases by.
 *
 * ---
 *
 * <Aggro Multiplier: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to increase the amount of perceived aggro it has
 *   by the aggro multiplier.
 * - Replace 'x' with a number representing the percentage to increase/decrease
 *   the perceived aggro by.
 * - If multiple of these traits exist across different trait objects, the
 *   effects are increased multiplicatively.
 *
 * ---
 *
 * <Bypass Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will decide targets by aggro weight
 *   instead of always picking the highest aggro unit(s).
 * - If used on trait objects, the affected unit will decide targets by aggro
 *   weight instead of always picking the highest aggro unit(s).
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 * 
 * <Bypass Highest Aggro>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass highest aggro effects and instead focuses on
 *   targets by aggro weight instead.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 * 
 * ---
 *
 * <Target Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will always decide its targets by
 *   the highest aggro value.
 * - If used on trait objects, the affected unit will always decide on targets
 *   by the highest aggro value.
 * - If the <Bypass Highest Aggro> notetag exists, this effect is ignored.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * === JavaScript Notetags: Aggro-Related ===
 *
 * ---
 *
 * <JS User Aggro>
 *  code
 *  code
 *  value = code
 * </JS User Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change the user's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <JS Target Aggro>
 *  code
 *  code
 *  value = code
 * </JS Target Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change target's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Aggro
 * - Changes target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Actor: Set Aggro
 * - Set target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Aggro
 * - Changes target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Enemy: Set Aggro
 * - Set target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Provoke Settings
 * ============================================================================
 *
 * The Provoke Settings Plugin Parameters adjust the visual aspects related to
 * the provoke effect. These settings will require VisuMZ_1_BattleCore to be
 * installed in order for them to work due to dependencies. 
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 *   Show Priority Lines?:
 *   - Show priority target lines for this plugin?
 *   - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Line Settings
 * 
 *   Arc Height:
 *   - How tall should the line arc in pixels?
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Height Origin:
 *   - The rate from the battler's sprite base to determine where the line
 *     starts from.
 * 
 *   Line Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Opacity:
 *   - The highest possible opacity for active provoke lines.
 * 
 *   Opacity Speed:
 *   - The speed at which opacity fluctuates for the line sprite.
 * 
 *   Parts:
 *   - The number of joint parts to split up the sprite as.
 * 
 *   Parts Size:
 *   - The number in pixels for the diameter of each part.
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Provoke Origin' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Taunt Settings
 * ============================================================================
 *
 * Battlers with specific taunt types can have animations playing on them over
 * and over to relay information to the player. These settings require you to
 * have both VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore installed in your
 * project's plugin list in order to use.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine & VisuMZ_1_BattleCore
 * 
 *   Show Animations?:
 *   - Show animations for each of the taunt effects?
 *   - Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Animation ID's
 * 
 *   Physical Taunt:
 *   - The animation ID used for physical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Magical Taunt:
 *   - The animation ID used for magical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Certain Hit Taunt:
 *   - The animation ID used for certain hit taunts.
 *   - Use 0 or 'None' to bypass this type.
 *
 * ---
 *
 * Animation Settings
 * 
 *   Cycle Time:
 *   - The amount of frames to wait before each animation cycle.
 *   - WARNING: Lower numbers can jeopardize game performance.
 * 
 *   Mirror Actor Ani?:
 *   - Mirror animations played on actors?
 * 
 *   Mute Animation SFX?:
 *   - Mute sounds played by animations?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Aggro Settings
 * ============================================================================
 *
 * This lets you adjust the settings for this plugin's Aggro mechanics. Most of
 * these settings focus on the visual gauge display of the Aggro gauge, but you
 * can also change up the settings for how aggro is utilized.
 *
 * ---
 *
 * General
 * 
 *   Priority: Highest TGR:
 *   - When enemies target actors for an single target attack, always target
 *     the highest members or make it weighted?
 *
 *   Aggro Per Damage:
 *   - The amount of aggro generated per point of HP damage dealt to an enemy.
 *
 *   Aggro Per Heal:
 *   - The amount of aggro generated per point of HP recovered to an ally.
 *
 * ---
 *
 * Gauge
 * 
 *   Visible Battler Gauge:
 *   - Display an aggro gauge over an SV actor's head to show current aggro
 *     level compared to other party members.
 * 
 *   Visible Status Gauge:
 *   - Display an aggro gauge in the Battle Status Window to show the current
 *     aggro level compared to others.
 * 
 *   Gauge Color 1:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Width:
 *   - Width in pixels you want the gauge to be.
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the Aggro Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the Aggro Gauge to be scaled?
 * 
 *   Battler Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 * 
 *   Battle Status Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Aggro Gauge' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.12: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for Battle Core updated version 1.73
 *    new features.
 * 
 * Version 1.11: November 17, 2022
 * * Bug Fixes!
 * ** <JS User Aggro> and <JS Target Aggro> should now work properly.
 *    Fix made by Arisu.
 * 
 * Version 1.10: August 25, 2022
 * * Documentation Update!
 * ** Added note to the <Provoke> notetag:
 * *** States with <Provoke> on them will automatically remove themselves if
 *     the provoker dies. Update made by Arisu.
 * * Feature Update!
 * ** States with <Provoke> on them will automatically remove themselves if the
 *    provoker dies. Update made by Arisu.
 * 
 * Version 1.09: June 2, 2022
 * * Bug Fixes!
 * ** Filename has been shortened from VisuMZ_2_AggroControlSystem.js to
 *    VisuMZ_2_AggroControlSys.js due to deployment reasons. For some mobile
 *    devices, keeping the name as long as VisuMZ_2_AggroControlSystem.js
 *    causes problems, but VisuMZ_2_AggroControlSys.js is fine. Take note of
 *    this while you are updating.
 * ** 'user' and 'target' now works properly with the JS notetags.
 *    Fix made by Irina.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Highest and lowest TGR members are now cached on an action by action
 *    basis for reduce needed computations. Update made by Irina.
 * 
 * Version 1.07: April 9, 2021
 * * Bug Fixes!
 * ** Provoke effect now takes into consideration when Provoke is applied by
 *    a weapon effect that comes off a counter attack from an actor. Fix made
 *    by Olivia.
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Subsequent battles or changing scenes should no longer clear the custom
 *    rendered bitmap used for the provoke trail. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for the Skill and Item versions of the following
 *    notetags into the help file and wiki:
 * *** <Bypass Provoke>
 * *** <Bypass Taunt>
 * *** <Bypass Highest Aggro>
 * 
 * Version 1.05: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Aggro Settings > Battle Status Gauge
 * **** These settings allow you to offset the Aggro Gauge in the Battle Status
 *      Window from its original position.
 * 
 * Version 1.04: February 26, 2021
 * * Bug Fixes!
 * ** Fixed positioning of gauge for List Style battle layouts without faces.
 *    Fix made by Olivia.
 * 
 * Version 1.03: February 5, 2021
 * * Feature Update!
 * ** Aggro is now cleared at the end of each battle in addition to the start
 *    of each battle. Update made by Olivia.
 *
 * Version 1.02: November 1, 2020
 * * Compatibility Update!
 * ** Plugin is made more compatible with other plugins.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Provoke lines should now be placed correctly if the UI area is smaller
 *    than the resolution area.
 * ** The Plugin Commands should no longer cause crashes. Fix made by Irina.
 *
 * Version 1.00: September 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeAggro
 * @text Actor: Change Aggro
 * @desc Changes target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSetAggro
 * @text Actor: Set Aggro
 * @desc Set target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeAggro
 * @text Enemy: Change Aggro
 * @desc Changes target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySetAggro
 * @text Enemy: Set Aggro
 * @desc Set target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AggroControl
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Provoke:struct
 * @text Provoke Settings
 * @type struct<Provoke>
 * @desc Settings related to the Provoke mechanic.
 * These settings require VisuMZ_1_BattleCore.
 * @default {"VisuMZ_1_BattleCore":"","ShowLines:eval":"true","LineSettings":"","ArcHeight:num":"125","BlendMode:num":"1","HeightOrigin:num":"0.8","LineColor:str":"#ff0000","Opacity:num":"255","OpacitySpeed:num":"4","Parts:num":"256","PartsSize:num":"5","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Provoke Origin"}
 *
 * @param Taunt:struct
 * @text Taunt Settings
 * @type struct<Taunt>
 * @desc Settings related to the Taunt mechanic.
 * @default {"Dependency":"VisuMZ_1_BattleCore","ShowAnimation:eval":"true","AnimationID":"","AniPhysical:num":"1","AniMagical:num":"2","AniCertain:num":"3","AnimationSettings":"","CycleTime:num":"60","MirrorActorAni:eval":"true","MuteAnimations:eval":"true"}
 *
 * @param Aggro:struct
 * @text Aggro Settings
 * @type struct<Aggro>
 * @desc Settings related to the Aggro mechanic.
 * @default {"General":"","PriorityHighest:eval":"true","AggroPerDmg:num":"0.1","AggroPerHeal:num":"0.5","Gauge":"","VisibleGauge:eval":"false","StatusGauge:eval":"true","GaugeColor1:str":"#959595","GaugeColor2:str":"#ffffff","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"+0","OffsetY:num":"+2","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Aggro Gauge"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Provoke Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Provoke:
 *
 * @param VisuMZ_1_BattleCore
 *
 * @param ShowLines:eval
 * @text Show Priority Lines?
 * @parent VisuMZ_1_BattleCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show priority target lines for this plugin?
 * Requires VisuMZ_1_BattleCore.
 * @default true
 *
 * @param LineSettings
 * @text Line Settings
 *
 * @param ArcHeight:num
 * @text Arc Height
 * @parent LineSettings
 * @type number
 * @desc How tall should the line arc in pixels?
 * @default 125
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent LineSettings
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param HeightOrigin:num
 * @text Height Origin
 * @parent LineSettings
 * @desc The rate from the battler's sprite base to determine where the line starts from.
 * @default 0.8
 *
 * @param LineColor:str
 * @text Line Color
 * @parent LineSettings
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ff0000
 *
 * @param Opacity:num
 * @text Opacity
 * @parent LineSettings
 * @type number
 * @min 1
 * @max 255
 * @desc The highest possible opacity for active provoke lines.
 * @default 255
 *
 * @param OpacitySpeed:num
 * @text Opacity Speed
 * @parent Opacity:num
 * @type number
 * @min 1
 * @desc The speed at which opacity fluctuates for the line sprite.
 * @default 4
 *
 * @param Parts:num
 * @text Parts
 * @parent LineSettings
 * @type number
 * @min 1
 * @desc The number of joint parts to split up the sprite as.
 * @default 256
 *
 * @param PartsSize:num
 * @text Parts Size
 * @parent Parts:num
 * @type number
 * @min 1
 * @desc The number in pixels for the diameter of each part.
 * @default 5
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Provoke Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Provoke Origin' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Provoke Origin
 *
 */
/* ----------------------------------------------------------------------------
 * Taunt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Taunt:
 *
 * @param Dependency
 * @text VisuMZ_0_CoreEngine
 * @default VisuMZ_1_BattleCore
 *
 * @param ShowAnimation:eval
 * @text Show Animations?
 * @parent Dependency
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show animations for each of the taunt effects?
 * Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 * @default true
 *
 * @param AnimationID
 * @text Animation ID's
 *
 * @param AniPhysical:num
 * @text Physical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for physical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 13
 *
 * @param AniMagical:num
 * @text Magical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for magical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 14
 *
 * @param AniCertain:num
 * @text Certain Hit Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for certain hit taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 15
 *
 * @param AnimationSettings
 * @text Animation Settings
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent AnimationSettings
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 60
 *
 * @param MirrorActorAni:eval
 * @text Mirror Actor Ani?
 * @parent AnimationSettings
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations played on actors?
 * @default true
 *
 * @param MuteAnimations:eval
 * @text Mute Animation SFX?
 * @parent AnimationSettings
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute sounds played by animations?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Aggro Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Aggro:
 *
 * @param General
 *
 * @param PriorityHighest:eval
 * @text Priority: Highest TGR
 * @parent General
 * @type boolean
 * @on Always
 * @off Weighted
 * @desc When enemies target actors for an single target attack,
 * always target the highest members or make it weighted?
 * @default true
 *
 * @param AggroPerDmg:num
 * @text Aggro Per Damage
 * @parent General
 * @desc The amount of aggro generated per point of HP damage dealt to an enemy.
 * @default 0.1
 *
 * @param AggroPerHeal:num
 * @text Aggro Per Heal
 * @parent General
 * @desc The amount of aggro generated per point of HP recovered to an ally.
 * @default 0.5
 *
 * @param Gauge
 *
 * @param VisibleGauge:eval
 * @text Visible Battler Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge over an SV actor's head to show
 * current aggro level compared to other party members.
 * @default false
 *
 * @param StatusGauge:eval
 * @text Visible Status Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge in the Battle Status Window
 * to show the current aggro level compared to others.
 * @default true
 *
 * @param GaugeColor1:str
 * @text Gauge Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #959595
 *
 * @param GaugeColor2:str
 * @text Gauge Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Gauge
 * @desc How large/small do you want the Aggro Gauge to be scaled?
 * @default 0.5
 * 
 * @param BattlerGauge
 * @text Battler Gauge
 * @parent Gauge
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param BattleStatus
 * @text Battle Status Gauge
 * @parent Gauge
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Aggro Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Aggro Gauge
 *
 */
//=============================================================================

function _0x500d(_0x814c04,_0x570152){const _0x1a1815=_0x1a18();return _0x500d=function(_0x500de8,_0x1c27e5){_0x500de8=_0x500de8-0x68;let _0x3b81d3=_0x1a1815[_0x500de8];return _0x3b81d3;},_0x500d(_0x814c04,_0x570152);}const _0x4aff1c=_0x500d;(function(_0xb6e100,_0x113333){const _0x47b65e=_0x500d,_0x2ffecf=_0xb6e100();while(!![]){try{const _0x44f426=parseInt(_0x47b65e(0x1f1))/0x1*(-parseInt(_0x47b65e(0x13f))/0x2)+-parseInt(_0x47b65e(0x15a))/0x3+parseInt(_0x47b65e(0x1f7))/0x4+parseInt(_0x47b65e(0x1f3))/0x5+-parseInt(_0x47b65e(0x20a))/0x6*(parseInt(_0x47b65e(0xc3))/0x7)+-parseInt(_0x47b65e(0x10b))/0x8+parseInt(_0x47b65e(0x97))/0x9;if(_0x44f426===_0x113333)break;else _0x2ffecf['push'](_0x2ffecf['shift']());}catch(_0x101adc){_0x2ffecf['push'](_0x2ffecf['shift']());}}}(_0x1a18,0x780a4));var label=_0x4aff1c(0xf2),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x15162a){const _0xe31c70=_0x4aff1c;return _0x15162a[_0xe31c70(0x218)]&&_0x15162a[_0xe31c70(0xb4)][_0xe31c70(0x1d7)]('['+label+']');})[0x0];VisuMZ[label][_0x4aff1c(0x16f)]=VisuMZ[label][_0x4aff1c(0x16f)]||{},VisuMZ[_0x4aff1c(0x20d)]=function(_0x45b369,_0x4aa822){const _0x53abf1=_0x4aff1c;for(const _0x5a84f6 in _0x4aa822){if(_0x5a84f6['match'](/(.*):(.*)/i)){const _0x200a21=String(RegExp['$1']),_0x3a5f72=String(RegExp['$2'])[_0x53abf1(0x7d)]()['trim']();let _0x2e5a56,_0x9ffc1d,_0x440aeb;switch(_0x3a5f72){case _0x53abf1(0xb8):_0x2e5a56=_0x4aa822[_0x5a84f6]!==''?Number(_0x4aa822[_0x5a84f6]):0x0;break;case _0x53abf1(0x115):_0x9ffc1d=_0x4aa822[_0x5a84f6]!==''?JSON[_0x53abf1(0xb7)](_0x4aa822[_0x5a84f6]):[],_0x2e5a56=_0x9ffc1d[_0x53abf1(0x1c6)](_0x3e29ba=>Number(_0x3e29ba));break;case _0x53abf1(0x1f6):_0x2e5a56=_0x4aa822[_0x5a84f6]!==''?eval(_0x4aa822[_0x5a84f6]):null;break;case _0x53abf1(0x181):_0x9ffc1d=_0x4aa822[_0x5a84f6]!==''?JSON[_0x53abf1(0xb7)](_0x4aa822[_0x5a84f6]):[],_0x2e5a56=_0x9ffc1d[_0x53abf1(0x1c6)](_0x4e721e=>eval(_0x4e721e));break;case _0x53abf1(0x9d):_0x2e5a56=_0x4aa822[_0x5a84f6]!==''?JSON[_0x53abf1(0xb7)](_0x4aa822[_0x5a84f6]):'';break;case _0x53abf1(0xc8):_0x9ffc1d=_0x4aa822[_0x5a84f6]!==''?JSON[_0x53abf1(0xb7)](_0x4aa822[_0x5a84f6]):[],_0x2e5a56=_0x9ffc1d[_0x53abf1(0x1c6)](_0x14ceec=>JSON[_0x53abf1(0xb7)](_0x14ceec));break;case'FUNC':_0x2e5a56=_0x4aa822[_0x5a84f6]!==''?new Function(JSON['parse'](_0x4aa822[_0x5a84f6])):new Function(_0x53abf1(0xdd));break;case'ARRAYFUNC':_0x9ffc1d=_0x4aa822[_0x5a84f6]!==''?JSON['parse'](_0x4aa822[_0x5a84f6]):[],_0x2e5a56=_0x9ffc1d[_0x53abf1(0x1c6)](_0x2cca54=>new Function(JSON[_0x53abf1(0xb7)](_0x2cca54)));break;case'STR':_0x2e5a56=_0x4aa822[_0x5a84f6]!==''?String(_0x4aa822[_0x5a84f6]):'';break;case'ARRAYSTR':_0x9ffc1d=_0x4aa822[_0x5a84f6]!==''?JSON[_0x53abf1(0xb7)](_0x4aa822[_0x5a84f6]):[],_0x2e5a56=_0x9ffc1d[_0x53abf1(0x1c6)](_0x2dd657=>String(_0x2dd657));break;case'STRUCT':_0x440aeb=_0x4aa822[_0x5a84f6]!==''?JSON[_0x53abf1(0xb7)](_0x4aa822[_0x5a84f6]):{},_0x2e5a56=VisuMZ['ConvertParams']({},_0x440aeb);break;case _0x53abf1(0x136):_0x9ffc1d=_0x4aa822[_0x5a84f6]!==''?JSON['parse'](_0x4aa822[_0x5a84f6]):[],_0x2e5a56=_0x9ffc1d[_0x53abf1(0x1c6)](_0x5125bb=>VisuMZ[_0x53abf1(0x20d)]({},JSON[_0x53abf1(0xb7)](_0x5125bb)));break;default:continue;}_0x45b369[_0x200a21]=_0x2e5a56;}}return _0x45b369;},(_0x1a5842=>{const _0x52876a=_0x4aff1c,_0xa69d89=_0x1a5842['name'];for(const _0x46cf6f of dependencies){if(!Imported[_0x46cf6f]){if('RBenX'==='RBenX'){alert(_0x52876a(0xf3)[_0x52876a(0x204)](_0xa69d89,_0x46cf6f)),SceneManager[_0x52876a(0x87)]();break;}else return _0x12ddab[_0x52876a(0xf2)][_0x52876a(0x16f)][_0x52876a(0x183)][_0x52876a(0x93)]/0x64;}}const _0x2cad9f=_0x1a5842[_0x52876a(0xb4)];if(_0x2cad9f[_0x52876a(0x17b)](/\[Version[ ](.*?)\]/i)){const _0xcb19bb=Number(RegExp['$1']);_0xcb19bb!==VisuMZ[label]['version']&&(alert(_0x52876a(0x90)[_0x52876a(0x204)](_0xa69d89,_0xcb19bb)),SceneManager['exit']());}if(_0x2cad9f[_0x52876a(0x17b)](/\[Tier[ ](\d+)\]/i)){if(_0x52876a(0xd6)===_0x52876a(0xac)){if(_0x4fb1bb[_0x52876a(0x195)]())_0x208dfb[_0x52876a(0x81)](_0x40f6e3);}else{const _0x17d4a1=Number(RegExp['$1']);if(_0x17d4a1<tier){if(_0x52876a(0x1f5)===_0x52876a(0x1bb)){let _0x223977=this[_0x52876a(0xa3)](_0x55528c);_0x516a17=_0x5e0498[_0x52876a(0x1fc)](_0x223977['y']+(_0x223977[_0x52876a(0x6b)]-_0x4f07da[_0x52876a(0x1d0)][_0x52876a(0x1c4)]())/0x2);}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x52876a(0x204)](_0xa69d89,_0x17d4a1,tier)),SceneManager['exit']();}else tier=Math['max'](_0x17d4a1,tier);}}VisuMZ[_0x52876a(0x20d)](VisuMZ[label]['Settings'],_0x1a5842[_0x52876a(0xc1)]);})(pluginData),PluginManager[_0x4aff1c(0x1cb)](pluginData[_0x4aff1c(0x147)],'ActorChangeAggro',_0x378977=>{const _0x200a77=_0x4aff1c;if(!$gameParty[_0x200a77(0x1d6)]())return;VisuMZ['ConvertParams'](_0x378977,_0x378977);const _0xa4966f=$gameActors[_0x200a77(0x127)](_0x378977[_0x200a77(0x192)]),_0x4362aa=_0x378977[_0x200a77(0x119)];if(_0xa4966f)_0xa4966f[_0x200a77(0x1af)](_0x4362aa);}),PluginManager[_0x4aff1c(0x1cb)](pluginData[_0x4aff1c(0x147)],'ActorSetAggro',_0x1adb55=>{const _0x52e57=_0x4aff1c;if(!$gameParty['inBattle']())return;VisuMZ[_0x52e57(0x20d)](_0x1adb55,_0x1adb55);const _0x52ef27=$gameActors['actor'](_0x1adb55[_0x52e57(0x192)]),_0x535228=_0x1adb55[_0x52e57(0x119)];if(_0x52ef27)_0x52ef27['setAggro'](_0x535228);}),PluginManager[_0x4aff1c(0x1cb)](pluginData[_0x4aff1c(0x147)],_0x4aff1c(0x71),_0xd8ab7=>{const _0x252c57=_0x4aff1c;if(!$gameParty[_0x252c57(0x1d6)]())return;VisuMZ[_0x252c57(0x20d)](_0xd8ab7,_0xd8ab7);const _0x1a8e5a=$gameTroop['members']()[_0xd8ab7[_0x252c57(0x1b4)]],_0x322e69=_0xd8ab7[_0x252c57(0x119)];if(_0x1a8e5a)_0x1a8e5a[_0x252c57(0x1af)](_0x322e69);}),PluginManager[_0x4aff1c(0x1cb)](pluginData[_0x4aff1c(0x147)],_0x4aff1c(0x9b),_0x1e69bc=>{const _0x3411cf=_0x4aff1c;if(!$gameParty[_0x3411cf(0x1d6)]())return;VisuMZ[_0x3411cf(0x20d)](_0x1e69bc,_0x1e69bc);const _0x293201=$gameTroop[_0x3411cf(0x72)]()[_0x1e69bc[_0x3411cf(0x1b4)]],_0xdbce56=_0x1e69bc[_0x3411cf(0x119)];if(_0x293201)_0x293201[_0x3411cf(0x168)](_0xdbce56);}),DataManager[_0x4aff1c(0x1c5)]=function(_0x1f9143){const _0x3a4724=_0x4aff1c;if(!_0x1f9143)return![];return _0x1f9143[_0x3a4724(0x1bf)]['match'](/<PROVOKE>/i);},DataManager['isBypassProvoke']=function(_0x19f726){const _0x48dc1a=_0x4aff1c;if(!_0x19f726)return![];return _0x19f726[_0x48dc1a(0x1bf)]['match'](/<BYPASS PROVOKE>/i);},DataManager['isBypassTaunt']=function(_0x72fd43){const _0x24bcbb=_0x4aff1c;if(!_0x72fd43)return![];return _0x72fd43[_0x24bcbb(0x1bf)][_0x24bcbb(0x17b)](/<BYPASS TAUNT>/i);},DataManager[_0x4aff1c(0x109)]=function(_0x585cf0){const _0x11bc85=_0x4aff1c;if(!_0x585cf0)return![];return _0x585cf0[_0x11bc85(0x1bf)]['match'](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},DataManager[_0x4aff1c(0x1b8)]=function(_0x4ffaa8){const _0x2bcfe6=_0x4aff1c;if(!_0x4ffaa8)return![];return _0x4ffaa8[_0x2bcfe6(0x1bf)][_0x2bcfe6(0x17b)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},ImageManager[_0x4aff1c(0x201)]=function(){const _0x3e51f3=_0x4aff1c;if(this[_0x3e51f3(0x1e2)])return this[_0x3e51f3(0x1e2)];return this['_provokeBitmap']=new Bitmap(0x64,0x64),this[_0x3e51f3(0x1e2)][_0x3e51f3(0x216)](0x32,0x32,0x32,ColorManager['provokeLineColor']()),this[_0x3e51f3(0x1e2)][_0x3e51f3(0xfb)]=![],this[_0x3e51f3(0x1e2)];},ConfigManager['aggroGauge']=!![],ConfigManager[_0x4aff1c(0x100)]=!![],VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x78)]=ConfigManager[_0x4aff1c(0xe6)],ConfigManager[_0x4aff1c(0xe6)]=function(){const _0x4171d8=_0x4aff1c,_0x402ffc=VisuMZ[_0x4171d8(0xf2)]['ConfigManager_makeData'][_0x4171d8(0x14f)](this);return _0x402ffc[_0x4171d8(0x219)]=this[_0x4171d8(0x219)],_0x402ffc[_0x4171d8(0x100)]=this[_0x4171d8(0x100)],_0x402ffc;},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x12d)]=ConfigManager[_0x4aff1c(0xc0)],ConfigManager['applyData']=function(_0x4518cf){const _0x33b4bb=_0x4aff1c;VisuMZ[_0x33b4bb(0xf2)][_0x33b4bb(0x12d)][_0x33b4bb(0x14f)](this,_0x4518cf),'aggroGauge'in _0x4518cf?this[_0x33b4bb(0x219)]=_0x4518cf[_0x33b4bb(0x219)]:this[_0x33b4bb(0x219)]=!![],_0x33b4bb(0x100)in _0x4518cf?this['provokeOrigin']=_0x4518cf[_0x33b4bb(0x100)]:_0x33b4bb(0x180)===_0x33b4bb(0x202)?(this[_0x33b4bb(0x1a4)]=_0x55655b,_0x10f5a7[_0x33b4bb(0xf2)]['BattleManager_invokeCounterAttack'][_0x33b4bb(0x14f)](this,_0x283868,_0x459ca9),this[_0x33b4bb(0x1a4)]=_0x4d80e2):this[_0x33b4bb(0x100)]=!![];},TextManager[_0x4aff1c(0x219)]=VisuMZ[_0x4aff1c(0xf2)]['Settings'][_0x4aff1c(0x119)][_0x4aff1c(0xf7)],TextManager[_0x4aff1c(0x100)]=VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x16f)][_0x4aff1c(0x183)][_0x4aff1c(0xf7)],ColorManager[_0x4aff1c(0x121)]=function(_0x402736,_0x12033b){const _0x410fa6=_0x4aff1c;_0x12033b=String(_0x12033b),this[_0x410fa6(0x18d)]=this['_colorCache']||{};if(_0x12033b[_0x410fa6(0x17b)](/#(.*)/i)){if(_0x410fa6(0xfa)!==_0x410fa6(0xf6))this[_0x410fa6(0x18d)][_0x402736]=_0x410fa6(0x145)[_0x410fa6(0x204)](String(RegExp['$1']));else return _0x36d4b0[_0x410fa6(0xf2)]['Settings'][_0x410fa6(0x183)][_0x410fa6(0x137)];}else{if(_0x410fa6(0xff)===_0x410fa6(0x1e3))return this['traitObjects']()[_0x410fa6(0x18c)](_0x2e8ce7=>_0x2e8ce7&&_0x2e8ce7[_0x410fa6(0x1bf)][_0x410fa6(0x17b)](/<BYPASS TAUNT>/i));else this[_0x410fa6(0x18d)][_0x402736]=this['textColor'](Number(_0x12033b));}return this[_0x410fa6(0x18d)][_0x402736];},ColorManager[_0x4aff1c(0x138)]=function(_0x389b47){const _0x27dc5a=_0x4aff1c;return _0x389b47=String(_0x389b47),_0x389b47['match'](/#(.*)/i)?_0x27dc5a(0x145)[_0x27dc5a(0x204)](String(RegExp['$1'])):_0x27dc5a(0x11f)===_0x27dc5a(0x11f)?this[_0x27dc5a(0xd4)](Number(_0x389b47)):this[_0x27dc5a(0x7e)]()[_0x27dc5a(0x18c)](_0x3eb41a=>_0x3eb41a&&_0x3eb41a[_0x27dc5a(0x1bf)][_0x27dc5a(0x17b)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},ColorManager[_0x4aff1c(0x6a)]=function(){const _0x1b81e2=_0x4aff1c,_0x2959e8=_0x1b81e2(0xa1);this['_colorCache']=this[_0x1b81e2(0x18d)]||{};if(this['_colorCache'][_0x2959e8])return this['_colorCache'][_0x2959e8];const _0x3fa467=VisuMZ['AggroControlSystem'][_0x1b81e2(0x16f)][_0x1b81e2(0x183)][_0x1b81e2(0x8b)];return this[_0x1b81e2(0x121)](_0x2959e8,_0x3fa467);},ColorManager[_0x4aff1c(0x140)]=function(){const _0x5d83a6=_0x4aff1c,_0x3575a4=_0x5d83a6(0x114);this[_0x5d83a6(0x18d)]=this[_0x5d83a6(0x18d)]||{};if(this['_colorCache'][_0x3575a4])return this[_0x5d83a6(0x18d)][_0x3575a4];const _0x2bc5ac=VisuMZ['AggroControlSystem'][_0x5d83a6(0x16f)]['Aggro']['GaugeColor1'];return this[_0x5d83a6(0x121)](_0x3575a4,_0x2bc5ac);},ColorManager[_0x4aff1c(0x13d)]=function(){const _0x28e33b=_0x4aff1c,_0x296b81=_0x28e33b(0x15f);this[_0x28e33b(0x18d)]=this[_0x28e33b(0x18d)]||{};if(this[_0x28e33b(0x18d)][_0x296b81])return this['_colorCache'][_0x296b81];const _0x5eef92=VisuMZ['AggroControlSystem'][_0x28e33b(0x16f)][_0x28e33b(0x119)][_0x28e33b(0x191)];return this[_0x28e33b(0x121)](_0x296b81,_0x5eef92);},SceneManager[_0x4aff1c(0x203)]=function(){const _0x2d5e65=_0x4aff1c;return this[_0x2d5e65(0xa7)]&&this['_scene']['constructor']===Scene_Battle;},BattleManager['convertBattleTargetToString']=function(_0x127af8){const _0x53b2fb=_0x4aff1c;let _0x4b38c6=this[_0x53b2fb(0x1d4)];this[_0x53b2fb(0x1a4)]&&(_0x53b2fb(0x1ef)===_0x53b2fb(0x1ef)?_0x4b38c6=this[_0x53b2fb(0x1a4)]:this[_0x53b2fb(0x163)]=0x1);if(!_0x4b38c6)return null;if(_0x4b38c6[_0x53b2fb(0x1ca)]()&&_0x127af8[_0x53b2fb(0x14a)]())return _0x53b2fb(0x10c)['format'](_0x4b38c6[_0x53b2fb(0x143)]());else{if(_0x4b38c6[_0x53b2fb(0x14a)]()&&_0x127af8[_0x53b2fb(0x1ca)]()){if(_0x53b2fb(0x1bc)===_0x53b2fb(0x1ea))this[_0x53b2fb(0xbb)]=0xff;else return _0x53b2fb(0xf8)[_0x53b2fb(0x204)](_0x4b38c6[_0x53b2fb(0xeb)]());}}return null;},BattleManager[_0x4aff1c(0x112)]=function(_0x163a9b){const _0x3ce9a1=_0x4aff1c;if(!_0x163a9b)return null;if(_0x163a9b[_0x3ce9a1(0x17b)](/BATTLE ACTOR (\d+)/i))return $gameActors[_0x3ce9a1(0x127)](Number(RegExp['$1']));else{if(_0x163a9b[_0x3ce9a1(0x17b)](/BATTLE ENEMY (\d+)/i))return $gameTroop[_0x3ce9a1(0x72)]()[Number(RegExp['$1'])];}return null;},BattleManager[_0x4aff1c(0x18e)]=function(){const _0x423ef6=_0x4aff1c;return VisuMZ[_0x423ef6(0xf2)][_0x423ef6(0x16f)][_0x423ef6(0x119)][_0x423ef6(0x126)];},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0xde)]=Game_Action[_0x4aff1c(0x1d0)][_0x4aff1c(0xcc)],Game_Action[_0x4aff1c(0x1d0)]['getSpecificBattlerKeyTarget']=function(){const _0x48f85a=_0x4aff1c;let _0x30db78=VisuMZ['AggroControlSystem'][_0x48f85a(0xde)][_0x48f85a(0x14f)](this);if(_0x30db78[_0x48f85a(0x1ca)]()!==this[_0x48f85a(0x132)]()[_0x48f85a(0x1ca)]()){if(_0x48f85a(0x11b)===_0x48f85a(0x11b)){this[_0x48f85a(0x167)]=-0x1;if(this[_0x48f85a(0xce)]())return this[_0x48f85a(0x132)]()[_0x48f85a(0x215)]();else{if(this[_0x48f85a(0x208)]()){const _0x14f128=this['item']()[_0x48f85a(0x6f)],_0x187995=this['opponentsUnit']()['getTauntMembers'](_0x14f128);if(!_0x187995[_0x48f85a(0x1d7)](_0x30db78))return _0x48f85a(0x176)!==_0x48f85a(0x20e)?_0x187995[Math[_0x48f85a(0x104)](_0x187995[_0x48f85a(0x113)])]:this['isAggroType']()?_0x5a3c33['aggroGaugeColor2']():_0x2b6728['AggroControlSystem'][_0x48f85a(0x162)]['call'](this);}else{if(this[_0x48f85a(0x118)]()){if('gbRFa'!==_0x48f85a(0x69)){const _0x172518=this[_0x48f85a(0xa3)](_0x43d654);let _0x5c545a=this[_0x48f85a(0xcd)](_0x172518);if(_0x23622d[_0x48f85a(0x189)]){if(this[_0x48f85a(0x11d)]()==='list'){let _0x5dc720=this[_0x48f85a(0xa3)](_0x4e5f0b);_0x5c545a=_0x318dc2[_0x48f85a(0x1fc)](_0x5dc720['y']+(_0x5dc720['height']-_0x296c7c['prototype'][_0x48f85a(0x1c4)]())/0x2);}}if(this[_0x48f85a(0x155)]())_0x5c545a-=_0x552b1b['prototype'][_0x48f85a(0x13a)]()-0x1;return _0x5c545a;}else return this[_0x48f85a(0x217)]()[_0x48f85a(0x1a0)]();}}}}else{if(this[_0x48f85a(0x131)][_0x48f85a(0x1eb)]())return 0x0;if(this[_0x48f85a(0x131)][_0x48f85a(0x14c)]()&&this['_battler'][_0x48f85a(0x1ff)]()[_0x48f85a(0x184)]()[_0x48f85a(0x113)]===0x1)return 0x1;}}return _0x30db78;},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x117)]=Game_Action[_0x4aff1c(0x1d0)][_0x4aff1c(0xc4)],Game_Action[_0x4aff1c(0x1d0)][_0x4aff1c(0xc4)]=function(_0x155198){const _0x43ed0a=_0x4aff1c;if(this[_0x43ed0a(0xce)]())return this[_0x43ed0a(0x1a5)]();else{if(this[_0x43ed0a(0x208)]())return this[_0x43ed0a(0xed)](_0x155198);else return this[_0x43ed0a(0x118)]()?[_0x155198[_0x43ed0a(0x1a0)]()]:VisuMZ[_0x43ed0a(0xf2)][_0x43ed0a(0x117)]['call'](this,_0x155198);}},Game_Action[_0x4aff1c(0x1d0)][_0x4aff1c(0xce)]=function(){const _0x5a9e18=_0x4aff1c;if(!$gameParty[_0x5a9e18(0x1d6)]())return![];if(!this[_0x5a9e18(0x6e)]())return![];if(DataManager[_0x5a9e18(0x196)](this[_0x5a9e18(0x199)]()))return![];if(this[_0x5a9e18(0x132)]()[_0x5a9e18(0xe4)]())return![];if(!this[_0x5a9e18(0x132)]()[_0x5a9e18(0xce)]())return![];const _0x3684ea=this[_0x5a9e18(0x132)]()[_0x5a9e18(0x215)]();if(_0x3684ea[_0x5a9e18(0x1eb)]())return![];return!![];},Game_Action[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a5)]=function(){const _0x131948=_0x4aff1c;return[this['subject']()[_0x131948(0x215)]()];},Game_Action['prototype'][_0x4aff1c(0x208)]=function(){const _0x324fbd=_0x4aff1c;if(!$gameParty[_0x324fbd(0x1d6)]())return![];if(!this[_0x324fbd(0x6e)]())return![];if(DataManager[_0x324fbd(0xad)](this['item']()))return![];if(this[_0x324fbd(0x132)]()[_0x324fbd(0x1c8)]())return![];const _0x2aef7a=this['opponentsUnit']();let _0x59a671=![];if(this['isPhysical']()&&_0x2aef7a[_0x324fbd(0x18a)]()[_0x324fbd(0x113)]>0x0)_0x59a671=!![];if(this['isMagical']()&&_0x2aef7a['magicalTauntMembers']()['length']>0x0)_0x59a671=!![];if(this[_0x324fbd(0x120)]()&&_0x2aef7a[_0x324fbd(0x14b)]()[_0x324fbd(0x113)]>0x0)_0x59a671=!![];return _0x59a671;},Game_Action[_0x4aff1c(0x1d0)][_0x4aff1c(0xed)]=function(_0x297190){const _0x537e40=_0x4aff1c;if(this[_0x537e40(0x167)]<0x0){if(_0x537e40(0x91)!==_0x537e40(0x91)){if(!_0x5d6361[_0x537e40(0x189)])return![];if(![_0x2fa119,_0x20c17e][_0x537e40(0x1d7)](this[_0x537e40(0x1ba)]))return![];return _0x31c037[_0x537e40(0x100)]&&_0x142597[_0x537e40(0xf2)]['Settings']['Provoke'][_0x537e40(0x141)];}else return[_0x297190[_0x537e40(0x214)](this[_0x537e40(0x199)]()['hitType'])];}else{const _0x168e7d=_0x297190[_0x537e40(0x10d)](this['_targetIndex']);if(_0x168e7d[_0x537e40(0x1e4)](this[_0x537e40(0x199)]()[_0x537e40(0x6f)])){if('nxHpD'===_0x537e40(0x19c))_0x38cf14[_0x537e40(0xf2)][_0x537e40(0x94)][_0x537e40(0x14f)](this),this[_0x537e40(0x1e6)]();else return[_0x168e7d];}else{if(_0x537e40(0xa8)!=='kxSkq')return[_0x297190['randomTauntTarget']()];else{let _0x5328d2=_0x25fb0e[_0x537e40(0xf2)][_0x537e40(0x21a)]['call'](this,_0x289523);if(_0x2a705d===0x0){if(this['_aggro']===_0x1baddf)this[_0x537e40(0x1c2)]();_0x5328d2*=this[_0x537e40(0x12e)]();}return _0x5328d2;}}}},Game_Action[_0x4aff1c(0x1d0)][_0x4aff1c(0x118)]=function(){const _0x243a4b=_0x4aff1c;if(!$gameParty[_0x243a4b(0x1d6)]())return![];if(this['item']()[_0x243a4b(0x166)]!==0x1)return![];if(this[_0x243a4b(0x167)]>=0x0)return![];if(DataManager[_0x243a4b(0x109)](this['item']()))return![];if(this[_0x243a4b(0x132)]()[_0x243a4b(0xca)]())return![];if(DataManager[_0x243a4b(0x1b8)](this[_0x243a4b(0x199)]()))return!![];if(this[_0x243a4b(0x132)]()[_0x243a4b(0x1b8)]())return!![];return BattleManager[_0x243a4b(0x18e)]();},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0xfe)]=Game_Action['prototype'][_0x4aff1c(0x144)],Game_Action['prototype'][_0x4aff1c(0x144)]=function(){const _0x366f1d=_0x4aff1c;VisuMZ[_0x366f1d(0xf2)][_0x366f1d(0xfe)][_0x366f1d(0x14f)](this),this[_0x366f1d(0x149)]();},Game_Action[_0x4aff1c(0x1d0)][_0x4aff1c(0x149)]=function(){const _0x29eade=_0x4aff1c,_0x518977=this[_0x29eade(0x199)]()[_0x29eade(0x1bf)];if(_0x518977[_0x29eade(0x17b)](/<(?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT): ([\+\-]\d+)>/i)){const _0x4fb6ed=Number(RegExp['$1']);this[_0x29eade(0x132)]()['gainAggro'](_0x4fb6ed);}if(_0x518977[_0x29eade(0x17b)](/<JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>\s*([\s\S]*)\s*<\/JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>/i)){const _0x4fa11d=String(RegExp['$1']);window[_0x29eade(0xc6)]=this[_0x29eade(0x132)](),window[_0x29eade(0x199)]=this[_0x29eade(0x199)](),window['a']=this[_0x29eade(0x132)](),window['b']=a,window[_0x29eade(0x1cc)]=user[_0x29eade(0x148)]();try{if(_0x29eade(0x1c9)==='rEaZs'){const _0x2945e6=new _0x2bb003();_0x2945e6['bitmap']=_0x28d9bc[_0x29eade(0x201)](),_0x2945e6[_0x29eade(0x160)]['x']=0.5,_0x2945e6[_0x29eade(0x160)]['y']=0.5,_0x2945e6[_0x29eade(0x14e)]['x']=_0x2945e6[_0x29eade(0x14e)]['y']=this[_0x29eade(0x1ac)](),_0x2945e6['opacity']=_0x31a0ca,_0x2945e6[_0x29eade(0xd0)]=this[_0x29eade(0xd0)],this[_0x29eade(0xdf)](_0x2945e6),this['_sprites'][_0x29eade(0x20b)](_0x2945e6),_0x89b6b4+=this[_0x29eade(0x1ae)];if(_0x29cbff>=0xff)_0xdf4912=0x0;}else eval(_0x4fa11d);}catch(_0x3ab8b2){if(_0x29eade(0x1e7)===_0x29eade(0xb1)){const _0x1a9fe8=this[_0x29eade(0xe1)][_0x29eade(0x131)];if(!_0x1a9fe8)this[_0x29eade(0xbb)]=0x0;else _0x1a9fe8['isAlive']()&&_0x1a9fe8[_0x29eade(0x215)]()?this[_0x29eade(0xbb)]=0xff:this[_0x29eade(0xbb)]=0x0;}else{if($gameTemp[_0x29eade(0x195)]())console[_0x29eade(0x81)](_0x3ab8b2);}}user['setAggro'](window['value']),window[_0x29eade(0xc6)]=undefined,window[_0x29eade(0xab)]=undefined,window[_0x29eade(0x199)]=undefined,window['a']=undefined,window['b']=undefined,window[_0x29eade(0x1cc)]=undefined;}},VisuMZ['AggroControlSystem']['Game_Action_applyItemUserEffect']=Game_Action['prototype'][_0x4aff1c(0xda)],Game_Action['prototype'][_0x4aff1c(0xda)]=function(_0x39e285){const _0x42028a=_0x4aff1c;VisuMZ['AggroControlSystem'][_0x42028a(0x73)][_0x42028a(0x14f)](this,_0x39e285),this[_0x42028a(0x1d9)](_0x39e285);},Game_Action[_0x4aff1c(0x1d0)][_0x4aff1c(0x1d9)]=function(_0x318632){const _0x39a694=_0x4aff1c;if(!this[_0x39a694(0x199)]())return;if(!SceneManager[_0x39a694(0x203)]())return;const _0x13b5e4=this['item']()[_0x39a694(0x1bf)];if(_0x13b5e4['match'](/<TARGET (?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){const _0x4cab62=Number(RegExp['$1']);_0x318632[_0x39a694(0x1af)](_0x4cab62);}if(_0x13b5e4[_0x39a694(0x17b)](/<JS TARGET (?:AGGRO|ENMITY|THREAT)>\s*([\s\S]*)\s*<\/JS TARGET (?:AGGRO|ENMITY|THREAT)>/i)){if(_0x39a694(0xea)!=='xTWnH')_0x372e49(this[_0x39a694(0x17f)]['bind'](this),0x3e8);else{const _0x3c62da=String(RegExp['$1']);window['user']=this[_0x39a694(0x132)](),window[_0x39a694(0xab)]=_0x318632,window[_0x39a694(0x199)]=this[_0x39a694(0x199)](),window['a']=this[_0x39a694(0x132)](),window['b']=_0x318632,window[_0x39a694(0x1cc)]=_0x318632[_0x39a694(0x148)]();try{'keMVw'!==_0x39a694(0x76)?(_0x5d3645[_0x39a694(0xf2)][_0x39a694(0xe0)][_0x39a694(0x14f)](this),this['updateTauntAnimations']()):eval(_0x3c62da);}catch(_0x472b60){if(_0x39a694(0x165)!==_0x39a694(0x165)){if(!this[_0x39a694(0x13b)]){const _0x48f710=this[_0x39a694(0x111)](),_0x52994a=this[_0x39a694(0x184)]()[_0x39a694(0x82)](_0x35bc0a=>_0x35bc0a[_0x39a694(0x77)]===_0x48f710);this[_0x39a694(0x13b)]=_0x52994a[_0x261a8b[_0x39a694(0x104)](_0x52994a[_0x39a694(0x113)])]||this[_0x39a694(0x1dc)]();}return this[_0x39a694(0x13b)];}else{if($gameTemp['isPlaytest']())console[_0x39a694(0x81)](_0x472b60);}}_0x318632[_0x39a694(0x168)](window[_0x39a694(0x1cc)]),window[_0x39a694(0xc6)]=undefined,window[_0x39a694(0xab)]=undefined,window[_0x39a694(0x199)]=undefined,window['a']=undefined,window['b']=undefined,window[_0x39a694(0x1cc)]=undefined;}}},VisuMZ['AggroControlSystem'][_0x4aff1c(0x1ad)]=Game_Action[_0x4aff1c(0x1d0)][_0x4aff1c(0x173)],Game_Action[_0x4aff1c(0x1d0)][_0x4aff1c(0x173)]=function(_0x44e6e4,_0x39c91d){const _0x65c444=_0x4aff1c;VisuMZ[_0x65c444(0xf2)][_0x65c444(0x1ad)][_0x65c444(0x14f)](this,_0x44e6e4,_0x39c91d),this[_0x65c444(0x98)](_0x44e6e4,_0x39c91d);},Game_Action['prototype']['executeHpDamageAggroControl']=function(_0x5d42a1,_0xc67549){const _0x313522=_0x4aff1c,_0x376708=VisuMZ[_0x313522(0xf2)][_0x313522(0x16f)][_0x313522(0x119)];if(_0xc67549>0x0&&_0x5d42a1['isActor']()!==this[_0x313522(0x132)]()[_0x313522(0x1ca)]()){const _0x4ee963=_0x376708[_0x313522(0x8a)];this[_0x313522(0x132)]()[_0x313522(0x1af)](_0x4ee963*_0xc67549);}if(_0xc67549<0x0&&_0x5d42a1[_0x313522(0x1ca)]()===this[_0x313522(0x132)]()['isActor']()){if('LWSJV'===_0x313522(0x7c))this[_0x313522(0xe1)]=_0x4b3222,_0x1f0dd0[_0x313522(0x1d0)][_0x313522(0x16a)]['call'](this),this['initMembers'](),this['createChildSprites']();else{const _0x47d1b7=_0x376708[_0x313522(0x198)];this['subject']()[_0x313522(0x1af)](_0x47d1b7*Math[_0x313522(0xcf)](_0xc67549));}}},VisuMZ['AggroControlSystem'][_0x4aff1c(0xfc)]=Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0xbe)],Game_BattlerBase[_0x4aff1c(0x1d0)]['initMembers']=function(){const _0x205b34=_0x4aff1c;this['_cache']={},VisuMZ['AggroControlSystem'][_0x205b34(0xfc)][_0x205b34(0x14f)](this),this[_0x205b34(0x197)]();},Game_BattlerBase['prototype'][_0x4aff1c(0x197)]=function(){const _0x2867e4=_0x4aff1c;this[_0x2867e4(0x1e1)](),this[_0x2867e4(0x1c2)]();},Game_BattlerBase['prototype'][_0x4aff1c(0x1e1)]=function(){const _0x324f57=_0x4aff1c;this[_0x324f57(0x21b)]={};},VisuMZ[_0x4aff1c(0xf2)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x1d5)],Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x1d5)]=function(){const _0x5db70f=_0x4aff1c;this[_0x5db70f(0x209)]={},VisuMZ[_0x5db70f(0xf2)][_0x5db70f(0x1f9)]['call'](this),this[_0x5db70f(0x1fa)]();},Game_BattlerBase['prototype']['checkCacheKey']=function(_0xb9d360){const _0xf8fd9f=_0x4aff1c;return this[_0xf8fd9f(0x209)]=this[_0xf8fd9f(0x209)]||{},this['_cache'][_0xb9d360]!==undefined;},Game_BattlerBase['prototype'][_0x4aff1c(0x215)]=function(){const _0x2da851=_0x4aff1c;for(const _0x493fcb of this[_0x2da851(0x13e)]()){if(DataManager['stateHasProvoke'](_0x493fcb)){if(this[_0x2da851(0x21b)]===undefined)this[_0x2da851(0x1e1)]();const _0x4a464f=this[_0x2da851(0x21b)][_0x493fcb['id']],_0x569c8e=BattleManager[_0x2da851(0x112)](_0x4a464f);if(_0x569c8e&&_0x569c8e[_0x2da851(0x14c)]())return _0x569c8e;}}return null;},Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0xce)]=function(){const _0x320633=_0x4aff1c;return!!this[_0x320633(0x215)]();},Game_BattlerBase['prototype']['bypassProvoke']=function(){const _0x348ec9=_0x4aff1c;return this[_0x348ec9(0x7e)]()['some'](_0x5f1fbb=>_0x5f1fbb&&_0x5f1fbb['note'][_0x348ec9(0x17b)](/<BYPASS PROVOKE>/i));},Game_BattlerBase['prototype'][_0x4aff1c(0x194)]=function(){const _0x89cb61=_0x4aff1c;let _0x1d2e89=_0x89cb61(0x194);if(this['checkCacheKey'](_0x1d2e89))return this[_0x89cb61(0x209)][_0x1d2e89];return this[_0x89cb61(0x209)][_0x1d2e89]=this[_0x89cb61(0x6c)](),this[_0x89cb61(0x209)][_0x1d2e89];},Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x6c)]=function(){const _0x1ebeb6=_0x4aff1c,_0x1a2012=this[_0x1ebeb6(0x1ca)]()?this[_0x1ebeb6(0x127)]()[_0x1ebeb6(0x1bf)]:this['isEnemy']()?this[_0x1ebeb6(0x1be)]()[_0x1ebeb6(0x1bf)]:'';if(_0x1a2012[_0x1ebeb6(0x17b)](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return Number(RegExp['$1'])*0.01;return VisuMZ['AggroControlSystem'][_0x1ebeb6(0x16f)][_0x1ebeb6(0x183)][_0x1ebeb6(0x17e)];},Game_BattlerBase[_0x4aff1c(0x1d0)]['removeDeadProvokerStates']=function(){const _0x5927bc=_0x4aff1c;for(const _0x2a7bc0 of this[_0x5927bc(0x13e)]()){if(DataManager['stateHasProvoke'](_0x2a7bc0)){if(_0x5927bc(0xe9)!==_0x5927bc(0xe9))return null;else{if(this[_0x5927bc(0x21b)]===undefined)this[_0x5927bc(0x1e1)]();const _0x3e4dfa=this['_provoker'][_0x2a7bc0['id']],_0x1d4c9b=BattleManager[_0x5927bc(0x112)](_0x3e4dfa);_0x1d4c9b&&_0x1d4c9b[_0x5927bc(0x1eb)]()&&('JKVSU'!=='MBjiu'?this[_0x5927bc(0x142)](_0x2a7bc0['id']):(_0x495fb1[_0x5927bc(0x189)]&&this['sortEnemies'](),_0x4b55b3['prototype']['refresh']['call'](this)));}}}},Game_BattlerBase['prototype'][_0x4aff1c(0x1e4)]=function(_0x201b83){const _0x165dfb=_0x4aff1c;switch(_0x201b83){case Game_Action[_0x165dfb(0x7f)]:return this[_0x165dfb(0x187)]();break;case Game_Action[_0x165dfb(0x11c)]:return this[_0x165dfb(0x19a)]();break;case Game_Action[_0x165dfb(0x74)]:return this['certainHitTaunt']();break;}},Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x1aa)]=function(){const _0x4b3206=_0x4aff1c;return this[_0x4b3206(0x187)]()||this[_0x4b3206(0x19a)]()||this[_0x4b3206(0x1d2)]();},Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x187)]=function(){const _0x43237a=_0x4aff1c;return this['traitObjects']()[_0x43237a(0x18c)](_0x2f8132=>_0x2f8132&&_0x2f8132[_0x43237a(0x1bf)][_0x43237a(0x17b)](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase['prototype'][_0x4aff1c(0x19a)]=function(){const _0x21a0d2=_0x4aff1c;return this[_0x21a0d2(0x7e)]()[_0x21a0d2(0x18c)](_0x3df8c5=>_0x3df8c5&&_0x3df8c5[_0x21a0d2(0x1bf)][_0x21a0d2(0x17b)](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x4aff1c(0x1d0)]['certainHitTaunt']=function(){const _0x3fcc6f=_0x4aff1c;return this['traitObjects']()[_0x3fcc6f(0x18c)](_0x3ee23d=>_0x3ee23d&&_0x3ee23d[_0x3fcc6f(0x1bf)][_0x3fcc6f(0x17b)](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x1c8)]=function(){const _0x23d006=_0x4aff1c;return this['traitObjects']()['some'](_0x249acf=>_0x249acf&&_0x249acf['note'][_0x23d006(0x17b)](/<BYPASS TAUNT>/i));},Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x1c2)]=function(){this['_aggro']=0x1;},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x21a)]=Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0xb6)],Game_BattlerBase['prototype']['sparam']=function(_0x5b6ff5){const _0x504a95=_0x4aff1c;let _0x39b0af=VisuMZ['AggroControlSystem'][_0x504a95(0x21a)][_0x504a95(0x14f)](this,_0x5b6ff5);if(_0x5b6ff5===0x0){if(this[_0x504a95(0x163)]===undefined)this[_0x504a95(0x1c2)]();_0x39b0af*=this['aggro']();}return _0x39b0af;},Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x168)]=function(_0x44d58e){const _0x4fd187=_0x4aff1c;if(this[_0x4fd187(0x163)]===undefined)this[_0x4fd187(0x1c2)]();this[_0x4fd187(0x163)]=Math[_0x4fd187(0x1de)](0x1,Math['round'](this[_0x4fd187(0x163)]));},Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x1af)]=function(_0x3f943e){const _0x1ae03e=_0x4aff1c;if(this[_0x1ae03e(0x163)]===undefined)this[_0x1ae03e(0x1c2)]();this[_0x1ae03e(0x163)]=Math[_0x1ae03e(0x1de)](0x1,this[_0x1ae03e(0x163)]+Math[_0x1ae03e(0x1fc)](_0x3f943e));},Game_BattlerBase[_0x4aff1c(0x1d0)]['loseAggro']=function(_0x4a5b5c){this['gainAggro'](-_0x4a5b5c);},Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x12e)]=function(){const _0x2c5bf6=_0x4aff1c;if(this[_0x2c5bf6(0x1eb)]())return 0x0;return this[_0x2c5bf6(0x18f)]()*this[_0x2c5bf6(0xe5)]();},Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x148)]=function(){const _0x519002=_0x4aff1c;return this['_aggro']===undefined&&this[_0x519002(0x1c2)](),this['_aggro'];},Game_BattlerBase[_0x4aff1c(0x1d0)]['baseAggro']=function(){const _0x4d5029=_0x4aff1c;return this[_0x4d5029(0x7e)]()[_0x4d5029(0x1fe)]((_0x18edc0,_0x7d4628)=>{const _0x26a5e3=_0x4d5029;return _0x7d4628&&_0x7d4628[_0x26a5e3(0x1bf)][_0x26a5e3(0x17b)](/<(?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)?_0x18edc0+Number(RegExp['$1'])/0x64:_0x18edc0;},this[_0x4d5029(0x148)]());},Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0xe5)]=function(){const _0xeca23e=_0x4aff1c;return this[_0xeca23e(0x7e)]()['reduce']((_0x410092,_0x5e143e)=>{const _0xc5ee9b=_0xeca23e;if(_0x5e143e&&_0x5e143e[_0xc5ee9b(0x1bf)]['match'](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i)){if(_0xc5ee9b(0x10e)==='FadxY')return _0x410092+Number(RegExp['$1'])/0x64;else{if(this[_0xc5ee9b(0x163)]===_0x44b90f)this['clearAggro']();_0x57fa04*=this[_0xc5ee9b(0x12e)]();}}else return _0x410092;},0x1);},Game_BattlerBase[_0x4aff1c(0x1d0)][_0x4aff1c(0xca)]=function(){const _0x568a80=_0x4aff1c;return this[_0x568a80(0x7e)]()['some'](_0x4ed994=>_0x4ed994&&_0x4ed994['note'][_0x568a80(0x17b)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},Game_BattlerBase['prototype']['alwaysTargetHighestAggro']=function(){const _0x1f5fa0=_0x4aff1c;return this[_0x1f5fa0(0x7e)]()['some'](_0x47556d=>_0x47556d&&_0x47556d[_0x1f5fa0(0x1bf)]['match'](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0xba)]=Game_Battler[_0x4aff1c(0x1d0)][_0x4aff1c(0x1d8)],Game_Battler[_0x4aff1c(0x1d0)]['onBattleStart']=function(_0x370749){const _0x42bd8b=_0x4aff1c;VisuMZ[_0x42bd8b(0xf2)][_0x42bd8b(0xba)]['call'](this,_0x370749),this[_0x42bd8b(0x1c2)]();},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x1a2)]=Game_Battler[_0x4aff1c(0x1d0)]['onBattleEnd'],Game_Battler[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a3)]=function(){const _0x28c813=_0x4aff1c;VisuMZ['AggroControlSystem'][_0x28c813(0x1a2)][_0x28c813(0x14f)](this),this['clearAggro']();},VisuMZ['AggroControlSystem'][_0x4aff1c(0x1f8)]=Game_Battler[_0x4aff1c(0x1d0)]['addState'],Game_Battler[_0x4aff1c(0x1d0)][_0x4aff1c(0x153)]=function(_0x192f10){VisuMZ['AggroControlSystem']['Game_Battler_addState']['call'](this,_0x192f10),this['applyProvokeEffect'](_0x192f10);},Game_Battler[_0x4aff1c(0x1d0)]['applyProvokeEffect']=function(_0xfebe3f){const _0x4a7226=_0x4aff1c;if(this[_0x4a7226(0x89)](_0xfebe3f)){if(_0x4a7226(0x1db)!==_0x4a7226(0x1db))return this[_0x4a7226(0x1ed)]();else{if(this[_0x4a7226(0x21b)]===undefined)this[_0x4a7226(0x1e1)]();const _0x3adfaa=BattleManager[_0x4a7226(0x16c)](this);this[_0x4a7226(0x21b)][_0xfebe3f]=_0x3adfaa,!this[_0x4a7226(0x21b)][_0xfebe3f]&&(_0x4a7226(0xa4)==='CjDkS'?delete this[_0x4a7226(0x21b)][_0xfebe3f]:(_0x3a8e50[_0x4a7226(0xf2)][_0x4a7226(0x1b6)]['call'](this),this[_0x4a7226(0xaa)]()));}}},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0xa0)]=BattleManager[_0x4aff1c(0xaf)],BattleManager['invokeCounterAttack']=function(_0x5c1013,_0x70d15){const _0x37553d=_0x4aff1c;this[_0x37553d(0x1a4)]=_0x70d15,VisuMZ['AggroControlSystem']['BattleManager_invokeCounterAttack'][_0x37553d(0x14f)](this,_0x5c1013,_0x70d15),this[_0x37553d(0x1a4)]=undefined;},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x129)]=BattleManager[_0x4aff1c(0x125)],BattleManager[_0x4aff1c(0x125)]=function(_0x347a5a,_0x451e2c){const _0x18e358=_0x4aff1c;this[_0x18e358(0x1a4)]=_0x451e2c,VisuMZ[_0x18e358(0xf2)][_0x18e358(0x129)][_0x18e358(0x14f)](this,_0x347a5a,_0x451e2c),this[_0x18e358(0x1a4)]=undefined;},Game_Unit['prototype'][_0x4aff1c(0x18a)]=function(){const _0x20b19f=_0x4aff1c;return this[_0x20b19f(0x184)]()[_0x20b19f(0x82)](_0x470a0b=>_0x470a0b&&_0x470a0b[_0x20b19f(0x187)]());},Game_Unit[_0x4aff1c(0x1d0)][_0x4aff1c(0x110)]=function(){const _0x3eda6f=_0x4aff1c;return this['aliveMembers']()[_0x3eda6f(0x82)](_0x486c0a=>_0x486c0a&&_0x486c0a['magicalTaunt']());},Game_Unit[_0x4aff1c(0x1d0)]['certainHitTauntMembers']=function(){const _0x51ce15=_0x4aff1c;return this[_0x51ce15(0x184)]()[_0x51ce15(0x82)](_0x47a454=>_0x47a454&&_0x47a454['certainHitTaunt']());},Game_Unit[_0x4aff1c(0x1d0)][_0x4aff1c(0x1b7)]=function(_0x5520c2){const _0xba553a=_0x4aff1c;switch(_0x5520c2){case Game_Action[_0xba553a(0x7f)]:return this[_0xba553a(0x18a)]();break;case Game_Action[_0xba553a(0x11c)]:return this['magicalTauntMembers']();break;case Game_Action[_0xba553a(0x74)]:return this[_0xba553a(0x14b)]();break;}return[];},Game_Unit[_0x4aff1c(0x1d0)][_0x4aff1c(0x214)]=function(_0x10de49){const _0x3adc41=_0x4aff1c;let _0x29a167=[];switch(_0x10de49){case Game_Action[_0x3adc41(0x7f)]:_0x29a167=this[_0x3adc41(0x18a)]();break;case Game_Action[_0x3adc41(0x11c)]:_0x29a167=this[_0x3adc41(0x110)]();break;case Game_Action[_0x3adc41(0x74)]:_0x29a167=this[_0x3adc41(0x14b)]();break;}let _0x31f141=Math[_0x3adc41(0xf9)]()*this[_0x3adc41(0x85)](_0x29a167),_0x4cae71=null;if(BattleManager[_0x3adc41(0x18e)]()){if(_0x3adc41(0x8c)!==_0x3adc41(0x116)){const _0x2a869d=!![];return this[_0x3adc41(0x70)](_0x29a167,_0x2a869d);}else return[_0x461762];}else{for(const _0x718d42 of _0x29a167){_0x31f141-=_0x718d42[_0x3adc41(0x77)],_0x31f141<=0x0&&!_0x4cae71&&(_0x4cae71=_0x718d42);}return _0x4cae71||this[_0x3adc41(0x1dc)]();}},Game_Unit[_0x4aff1c(0x1d0)][_0x4aff1c(0x85)]=function(_0x33819c){const _0x1443b4=_0x4aff1c;return _0x33819c[_0x1443b4(0x1fe)]((_0x3ea9ff,_0x1b697a)=>_0x3ea9ff+_0x1b697a['tgr'],0x0);},Game_Unit['prototype'][_0x4aff1c(0x111)]=function(){const _0x59be73=_0x4aff1c,_0x3b7291=this[_0x59be73(0x184)]()[_0x59be73(0x1c6)](_0x3053c2=>_0x3053c2[_0x59be73(0x77)]);return Math[_0x59be73(0x1de)](..._0x3b7291);},Game_Unit[_0x4aff1c(0x1d0)][_0x4aff1c(0x1e5)]=function(){const _0x4c8b6f=_0x4aff1c,_0x4bb7d0=this[_0x4c8b6f(0x184)]()[_0x4c8b6f(0x1c6)](_0x50869f=>_0x50869f[_0x4c8b6f(0x77)]);return Math[_0x4c8b6f(0x15b)](..._0x4bb7d0);},Game_Unit[_0x4aff1c(0x1d0)][_0x4aff1c(0xfd)]=function(){const _0x576895=_0x4aff1c;this[_0x576895(0x13b)]=undefined,this[_0x576895(0xef)]=undefined;},Game_Unit[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a0)]=function(){const _0xbce306=_0x4aff1c;if(!this[_0xbce306(0x13b)]){const _0x3fdb91=this['tgrMax'](),_0x59d027=this[_0xbce306(0x184)]()[_0xbce306(0x82)](_0x20abc1=>_0x20abc1[_0xbce306(0x77)]===_0x3fdb91);this['_highestTgrMember']=_0x59d027[Math[_0xbce306(0x104)](_0x59d027[_0xbce306(0x113)])]||this[_0xbce306(0x1dc)]();}return this[_0xbce306(0x13b)];},Game_Unit[_0x4aff1c(0x1d0)][_0x4aff1c(0x212)]=function(){const _0xdae7fb=_0x4aff1c;if(!this[_0xdae7fb(0xef)]){const _0x45398d=this[_0xdae7fb(0x1e5)](),_0x325f3d=this['aliveMembers']()[_0xdae7fb(0x82)](_0x5d5677=>_0x5d5677[_0xdae7fb(0x77)]===_0x45398d);this[_0xdae7fb(0xef)]=_0x325f3d[Math[_0xdae7fb(0x104)](_0x325f3d[_0xdae7fb(0x113)])]||this[_0xdae7fb(0x1dc)]();}return this['_lowestTgrMember'];},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x190)]=BattleManager[_0x4aff1c(0x83)],BattleManager[_0x4aff1c(0x83)]=function(){const _0x22d46f=_0x4aff1c;VisuMZ['AggroControlSystem'][_0x22d46f(0x190)]['call'](this),$gameParty[_0x22d46f(0xfd)](),$gameTroop[_0x22d46f(0xfd)]();},Game_Unit['prototype'][_0x4aff1c(0x70)]=function(_0x449935,_0x36f324){const _0xdf56f2=_0x4aff1c,_0x243c2a=_0x449935[_0xdf56f2(0x1c6)](_0x1e9d30=>_0x1e9d30[_0xdf56f2(0x77)]),_0x3c75f0=_0x36f324?Math['max'](..._0x243c2a):Math[_0xdf56f2(0x15b)](..._0x243c2a),_0x307dea=_0x449935[_0xdf56f2(0x82)](_0x35026e=>_0x35026e[_0xdf56f2(0x77)]===_0x3c75f0);return _0x307dea[Math[_0xdf56f2(0x104)](_0x307dea[_0xdf56f2(0x113)])]||this[_0xdf56f2(0x1dc)]();},VisuMZ[_0x4aff1c(0xf2)]['Scene_Options_maxCommands']=Scene_Options[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a7)],Scene_Options[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a7)]=function(){const _0x42160b=_0x4aff1c;let _0x17398c=VisuMZ[_0x42160b(0xf2)][_0x42160b(0x122)][_0x42160b(0x14f)](this);const _0x528799=VisuMZ[_0x42160b(0xf2)][_0x42160b(0x16f)];if(_0x528799[_0x42160b(0x183)]['AddOption']&&_0x528799['Provoke'][_0x42160b(0x1b1)])_0x17398c++;if(_0x528799[_0x42160b(0x119)][_0x42160b(0xe8)]&&_0x528799[_0x42160b(0x119)]['AdjustOptionsRect'])_0x17398c++;return _0x17398c;},Sprite_Battler[_0x4aff1c(0x157)]=VisuMZ[_0x4aff1c(0xf2)]['Settings'][_0x4aff1c(0x16e)]['CycleTime'],Sprite_Battler['_physicalTauntAnimation']=VisuMZ['AggroControlSystem']['Settings'][_0x4aff1c(0x16e)]['AniPhysical'],Sprite_Battler[_0x4aff1c(0x175)]=VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x16f)][_0x4aff1c(0x16e)][_0x4aff1c(0x17d)],Sprite_Battler['_certainHitTauntAnimation']=VisuMZ['AggroControlSystem'][_0x4aff1c(0x16f)]['Taunt'][_0x4aff1c(0x7b)],Sprite_Battler[_0x4aff1c(0x88)]=VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x16f)][_0x4aff1c(0x16e)][_0x4aff1c(0x211)],Sprite_Battler['_muteTauntAnimations']=VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x16f)]['Taunt'][_0x4aff1c(0x75)],VisuMZ[_0x4aff1c(0xf2)]['Sprite_Battler_initialize']=Sprite_Battler['prototype']['initialize'],Sprite_Battler[_0x4aff1c(0x1d0)][_0x4aff1c(0x16a)]=function(_0x368973){const _0x34d1eb=_0x4aff1c;VisuMZ['AggroControlSystem']['Sprite_Battler_initialize']['call'](this,_0x368973),this[_0x34d1eb(0x164)]()&&setTimeout(this[_0x34d1eb(0x17f)]['bind'](this),0x3e8);},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x152)]=Sprite_Battler[_0x4aff1c(0x1d0)][_0x4aff1c(0xbe)],Sprite_Battler[_0x4aff1c(0x1d0)][_0x4aff1c(0xbe)]=function(){const _0x28b049=_0x4aff1c;VisuMZ[_0x28b049(0xf2)][_0x28b049(0x152)][_0x28b049(0x14f)](this),this[_0x28b049(0xd9)]();},Sprite_Battler[_0x4aff1c(0x1d0)][_0x4aff1c(0xd9)]=function(){const _0x2955c9=_0x4aff1c;this[_0x2955c9(0x207)]=VisuMZ[_0x2955c9(0xf2)]['Settings'][_0x2955c9(0x16e)][_0x2955c9(0x179)],this[_0x2955c9(0xcb)]=[_0x2955c9(0x101),_0x2955c9(0x1bd),_0x2955c9(0x12b)];},Sprite_Battler[_0x4aff1c(0x1d0)][_0x4aff1c(0x164)]=function(){const _0x39725c=_0x4aff1c;if(!Imported[_0x39725c(0x189)])return![];if(![Sprite_Actor,Sprite_Enemy][_0x39725c(0x1d7)](this['constructor']))return![];return ConfigManager['provokeOrigin']&&VisuMZ[_0x39725c(0xf2)]['Settings'][_0x39725c(0x183)][_0x39725c(0x141)];},Sprite_Battler[_0x4aff1c(0x1d0)][_0x4aff1c(0x17f)]=function(){const _0x1542c3=_0x4aff1c;if(!SceneManager['isSceneBattle']())return;this[_0x1542c3(0x16d)]=new Sprite_ProvokeTrail(this),this[_0x1542c3(0x16d)][_0x1542c3(0x182)]()[_0x1542c3(0xdf)](this[_0x1542c3(0x16d)]);},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x158)]=Sprite_Battler['prototype']['setBattler'],Sprite_Battler['prototype'][_0x4aff1c(0xf1)]=function(_0xd3cb97){const _0x5c4230=_0x4aff1c;VisuMZ[_0x5c4230(0xf2)][_0x5c4230(0x158)]['call'](this,_0xd3cb97);if(this['_aggroGaugeSprite'])this[_0x5c4230(0x105)][_0x5c4230(0x131)]=_0xd3cb97;},VisuMZ['AggroControlSystem']['Sprite_Battler_update']=Sprite_Battler['prototype'][_0x4aff1c(0x1a8)],Sprite_Battler[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a8)]=function(){const _0x163250=_0x4aff1c;VisuMZ[_0x163250(0xf2)][_0x163250(0xe0)][_0x163250(0x14f)](this),this[_0x163250(0xb0)]();},Sprite_Battler[_0x4aff1c(0x1d0)]['updateTauntAnimations']=function(){const _0x4aab8d=_0x4aff1c;if(!Imported[_0x4aab8d(0x96)])return;if(!Imported[_0x4aab8d(0x189)])return;if(!VisuMZ['AggroControlSystem']['Settings']['Taunt']['ShowAnimation'])return;if(!this[_0x4aab8d(0x131)])return;this[_0x4aab8d(0x207)]--,this[_0x4aab8d(0x207)]<=0x0&&this[_0x4aab8d(0x1ee)]();},Sprite_Battler['prototype'][_0x4aff1c(0x1ee)]=function(){const _0x4c8ac5=_0x4aff1c;this['_tauntAnimationTimer']=Sprite_Battler[_0x4c8ac5(0x157)];if(!this[_0x4c8ac5(0x131)])return;if(!this[_0x4c8ac5(0x131)][_0x4c8ac5(0x1aa)]())return;const _0x13eb2c=[this[_0x4c8ac5(0x131)]],_0x648ea8=this['getNextTauntAnimation'](),_0x151e6d=this[_0x4c8ac5(0x131)][_0x4c8ac5(0x1ca)]()&&Sprite_Battler[_0x4c8ac5(0x88)],_0x3c4bd7=Sprite_Battler[_0x4c8ac5(0x9c)];$gameTemp[_0x4c8ac5(0xf0)](_0x13eb2c,_0x648ea8,_0x151e6d,_0x3c4bd7);},Sprite_Battler[_0x4aff1c(0x1d0)]['getNextTauntAnimation']=function(){const _0x200b8b=_0x4aff1c;let _0x2f8331=this['_tauntAnimationCycle']['length'];while(_0x2f8331){const _0x211166=this[_0x200b8b(0xcb)][_0x200b8b(0xe2)]();this[_0x200b8b(0xcb)]['push'](_0x211166);const _0x119c2b=_0x200b8b(0x1a6)[_0x200b8b(0x204)](_0x211166);if(this[_0x200b8b(0x131)][_0x119c2b]()){const _0x294f95='_%1TauntAnimation'[_0x200b8b(0x204)](_0x211166),_0x52da9a=Sprite_Battler[_0x294f95];if(_0x52da9a)return _0x52da9a;}_0x2f8331--;}return Sprite_Battler['_certainHitTauntAnimation'];},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x15d)]=Sprite_Actor[_0x4aff1c(0x1d0)]['createStateSprite'],Sprite_Actor[_0x4aff1c(0x1d0)][_0x4aff1c(0xa6)]=function(){const _0x22b258=_0x4aff1c;VisuMZ[_0x22b258(0xf2)][_0x22b258(0x15d)][_0x22b258(0x14f)](this),this['createAggroGauge']();},Sprite_Actor['prototype'][_0x4aff1c(0x8d)]=function(){const _0x4824c6=_0x4aff1c;if(this[_0x4824c6(0x1ba)]!==Sprite_Actor)return;if(!this[_0x4824c6(0xd7)]())return;if(!SceneManager['isSceneBattle']())return;const _0x11a677=VisuMZ[_0x4824c6(0xf2)][_0x4824c6(0x16f)][_0x4824c6(0x119)],_0x265e6a=new Sprite_Gauge();_0x265e6a[_0x4824c6(0x160)]['x']=_0x11a677['AnchorX'],_0x265e6a[_0x4824c6(0x160)]['y']=_0x11a677[_0x4824c6(0x11a)];const _0x256a29=Sprite_Gauge['prototype'][_0x4824c6(0x19e)]();_0x265e6a[_0x4824c6(0x14e)]['x']=_0x265e6a[_0x4824c6(0x14e)]['y']=_0x11a677[_0x4824c6(0x15e)],this[_0x4824c6(0x105)]=_0x265e6a,this['addChild'](_0x265e6a);},Sprite_Actor[_0x4aff1c(0x1d0)]['isAggroGaugeVisible']=function(){const _0x77c796=_0x4aff1c;if(Imported[_0x77c796(0x189)]&&this['constructor']===Sprite_SvEnemy)return![];return ConfigManager[_0x77c796(0x219)]&&VisuMZ['AggroControlSystem']['Settings'][_0x77c796(0x119)][_0x77c796(0x1b0)];},VisuMZ['AggroControlSystem'][_0x4aff1c(0x156)]=Sprite_Actor[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a8)],Sprite_Actor[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a8)]=function(){const _0x58a19f=_0x4aff1c;VisuMZ[_0x58a19f(0xf2)][_0x58a19f(0x156)][_0x58a19f(0x14f)](this),this[_0x58a19f(0x19b)]();},Sprite_Actor['prototype']['updateAggroGaugeSprite']=function(){const _0x4a0618=_0x4aff1c;if(!this['_battler'])return;if(!this[_0x4a0618(0x105)])return;const _0x2b708f=VisuMZ['AggroControlSystem'][_0x4a0618(0x16f)][_0x4a0618(0x119)],_0x1d6388=this[_0x4a0618(0x105)];let _0x22a821=_0x2b708f[_0x4a0618(0x1a9)];this['_battler'][_0x4a0618(0x20c)]&&(_0x22a821+=this[_0x4a0618(0x131)][_0x4a0618(0x20c)]());let _0x17dddc=_0x2b708f[_0x4a0618(0x1f2)];this[_0x4a0618(0x131)][_0x4a0618(0xdb)]&&(_0x17dddc+=this[_0x4a0618(0x131)]['battleUIOffsetY']()),_0x1d6388['x']=_0x22a821,_0x1d6388['y']=-this[_0x4a0618(0x6b)]+_0x17dddc,this['_battler']&&_0x1d6388[_0x4a0618(0x95)]!==_0x4a0618(0x12e)&&(_0x1d6388[_0x4a0618(0x1df)]=!![],_0x1d6388[_0x4a0618(0xd1)](this[_0x4a0618(0x131)],_0x4a0618(0x12e))),this['scale']['x']<0x0&&(_0x1d6388[_0x4a0618(0x14e)]['x']=-Math[_0x4a0618(0xcf)](_0x1d6388['scale']['x']));},Sprite_Gauge['prototype'][_0x4aff1c(0x210)]=function(){const _0x5610eb=_0x4aff1c;return this[_0x5610eb(0x131)]&&this['_statusType']===_0x5610eb(0x12e);},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x1ab)]=Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0x185)],Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0x185)]=function(){const _0x556e20=_0x4aff1c;return this[_0x556e20(0x210)]()?0x0:VisuMZ['AggroControlSystem'][_0x556e20(0x1ab)][_0x556e20(0x14f)](this);},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x151)]=Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0x19d)],Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0x19d)]=function(){const _0x4faeec=_0x4aff1c;let _0x28a8ff=VisuMZ[_0x4faeec(0xf2)][_0x4faeec(0x151)][_0x4faeec(0x14f)](this);if(this[_0x4faeec(0x210)]()&&this[_0x4faeec(0x131)]){if(_0x4faeec(0x13c)!=='WWxFa')return!!this[_0x4faeec(0x215)]();else{if(this[_0x4faeec(0x131)][_0x4faeec(0x1eb)]())return 0x0;if(this[_0x4faeec(0x131)][_0x4faeec(0x14c)]()&&this['_battler']['friendsUnit']()['aliveMembers']()['length']===0x1)return 0x1;}}return _0x28a8ff[_0x4faeec(0x1da)](0x0,0x1);},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0xb2)]=Sprite_Gauge['prototype'][_0x4aff1c(0x86)],Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0x86)]=function(){const _0x4a987f=_0x4aff1c;return this[_0x4a987f(0x210)]()?this[_0x4a987f(0x150)]():VisuMZ['AggroControlSystem']['Sprite_Gauge_currentValue'][_0x4a987f(0x14f)](this);},Sprite_Gauge[_0x4aff1c(0x1d0)]['currentValueAggroControl']=function(){const _0x35e3c4=_0x4aff1c,_0x1b7cb1=this['_battler'][_0x35e3c4(0x1ff)](),_0x169a87=this[_0x35e3c4(0x131)][_0x35e3c4(0x77)]-_0x1b7cb1[_0x35e3c4(0x1e5)](),_0xd1f4d=_0x1b7cb1[_0x35e3c4(0x111)]()-_0x1b7cb1[_0x35e3c4(0x1e5)]();if(_0x169a87>=_0xd1f4d)return 0x64;return _0x169a87/Math[_0x35e3c4(0x1de)](_0xd1f4d,0x1)*0x64;},VisuMZ[_0x4aff1c(0xf2)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0x1d3)],Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0x1d3)]=function(){const _0x317686=_0x4aff1c;return this['isAggroType']()?this['currentMaxValueAggroControl']():VisuMZ[_0x317686(0xf2)][_0x317686(0xec)][_0x317686(0x14f)](this);},Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0x1ed)]=function(){return 0x64;},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x1ce)]=Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0xf5)],Sprite_Gauge[_0x4aff1c(0x1d0)]['gaugeColor1']=function(){const _0x48cbd6=_0x4aff1c;return this[_0x48cbd6(0x210)]()?ColorManager[_0x48cbd6(0x140)]():VisuMZ[_0x48cbd6(0xf2)][_0x48cbd6(0x1ce)]['call'](this);},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x162)]=Sprite_Gauge[_0x4aff1c(0x1d0)]['gaugeColor2'],Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0x172)]=function(){const _0x3646a3=_0x4aff1c;return this[_0x3646a3(0x210)]()?ColorManager['aggroGaugeColor2']():VisuMZ['AggroControlSystem'][_0x3646a3(0x162)]['call'](this);},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x20f)]=Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a8)],Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a8)]=function(){const _0x2eb8a6=_0x4aff1c;VisuMZ[_0x2eb8a6(0xf2)][_0x2eb8a6(0x20f)]['call'](this),this['updateOpacityAggroControl']();},Sprite_Gauge[_0x4aff1c(0x1d0)][_0x4aff1c(0xb9)]=function(){const _0x128b46=_0x4aff1c;if(!this[_0x128b46(0x210)]())return;if(!Imported[_0x128b46(0x189)])return;const _0x4f8884=this['_battler'][_0x128b46(0x170)]();if(this[_0x128b46(0x8e)])this[_0x128b46(0xbb)]=0xff;else{if(_0x4f8884&&_0x4f8884['opacity']>0x0)this[_0x128b46(0xbb)]=0xff;else{if(_0x128b46(0x1b9)!==_0x128b46(0x102))this['opacity']=0x0;else{const _0x3db362=_0x4ba81a(_0x12bad3['$1']);_0x3db362!==_0x4eb810[_0x52fd6d][_0x128b46(0x10f)]&&(_0x42b79e(_0x128b46(0x90)[_0x128b46(0x204)](_0x298bb5,_0x3db362)),_0x1c8969[_0x128b46(0x87)]());}}}},VisuMZ[_0x4aff1c(0xf2)]['Sprite_Gauge_drawValue']=Sprite_Gauge[_0x4aff1c(0x1d0)]['drawValue'],Sprite_Gauge[_0x4aff1c(0x1d0)]['drawValue']=function(){const _0x2a9318=_0x4aff1c;if(this['isAggroType']())return;VisuMZ['AggroControlSystem'][_0x2a9318(0x68)][_0x2a9318(0x14f)](this);};function _0x1a18(){const _0x15ed97=['getColor','faceWidth','gaugeHeight','_highestTgrMember','WWxFa','aggroGaugeColor2','states','4hjacMf','aggroGaugeColor1','ShowLines','removeState','actorId','applyGlobal','#%1','addCommand','name','battleAggro','applySubjectAggro','isEnemy','certainHitTauntMembers','isAlive','sortEnemies','scale','call','currentValueAggroControl','Sprite_Gauge_gaugeRate','Sprite_Battler_initMembers','addState','pow','isAtbGaugeVisible','Sprite_Actor_update','_animationCycleTime','Sprite_Battler_setBattler','children','2684820ykjNLI','min','BattleStatusOffsetX','Sprite_Actor_createStateSprite','Scale','aggro-gauge-color-2','anchor','aggroGaugeY','Sprite_Gauge_gaugeColor2','_aggro','isShowPriorityLines','mHqxW','scope','_targetIndex','setAggro','UaPSd','initialize','_spriteset','convertBattleTargetToString','_provokeSprite','Taunt','Settings','battler','canSingleOrMultipleSelect','gaugeColor2','executeHpDamage','Spriteset_Battle_createBattleField','_magicalTauntAnimation','fOsDh','isAggroGaugeShown','applyProvokeFilters','CycleTime','isTpb','match','StatusGauge','AniMagical','HeightOrigin','createProvokeSprite','cZsvR','ARRAYEVAL','parentContainer','Provoke','aliveMembers','gaugeX','_certainHitTauntAnimation','physicalTaunt','_damageContainer','VisuMZ_1_BattleCore','physicalTauntMembers','_targetX','some','_colorCache','isTargetHighestTGR','baseAggro','BattleManager_endAction','GaugeColor2','ActorID','setHandler','provokeHeightOrigin','isPlaytest','isBypassProvoke','initAggroControl','AggroPerHeal','item','magicalTaunt','updateAggroGaugeSprite','QXWoA','gaugeRate','bitmapWidth','time','highestTgrMember','drawAggroGauge','Game_Battler_onBattleEnd','onBattleEnd','_counterAttackingTarget','makeProvokeTarget','%1Taunt','maxCommands','update','OffsetX','taunting','Sprite_Gauge_gaugeX','partsSize','Game_Action_executeHpDamage','_opacitySpeed','gainAggro','VisibleGauge','AdjustOptionsRect','maxOpacity','boxHeight','EnemyIndex','concat','Spriteset_Battle_update','getTauntMembers','alwaysTargetHighestAggro','FyEIk','constructor','OsDog','pqTwx','magical','enemy','note','indexOf','Rzphn','clearAggro','_provokeContainer','bitmapHeight','stateHasProvoke','map','GrnEP','bypassTaunt','yyonT','isActor','registerCommand','value','_sprites','Sprite_Gauge_gaugeColor1','OpacitySpeed','prototype','setFrame','certainHitTaunt','currentMaxValue','_subject','refresh','inBattle','includes','onBattleStart','applyItemUserEffectAggroControl','clamp','DfaJA','randomTarget','_homeY','max','visible','placeAggroGauge','clearProvokers','_provokeBitmap','ksUhR','matchTauntType','tgrMin','addAggroControlSystemCommands','jdcJJ','applyTauntFilters','euQWI','LZVcs','isDead','qNrEn','currentMaxValueAggroControl','startNewTauntAnimation','wCyWN','ArcHeight','180954DaxZNJ','OffsetY','1070015swGGKl','RLxPo','RDcKn','EVAL','3863244IYnEEU','Game_Battler_addState','Game_BattlerBase_refresh','removeDeadProvokerStates','aHxoM','round','_homeX','reduce','friendsUnit','inputtingAction','provokeBitmap','dVeLh','isSceneBattle','format','Window_BattleEnemy_refresh','aggroGaugeX','_tauntAnimationTimer','isTauntAffected','_cache','534GPTOcc','push','battleUIOffsetX','ConvertParams','pgUDP','Sprite_Gauge_update','isAggroType','MirrorActorAni','lowestTgrMember','nameX','randomTauntTarget','provoker','drawCircle','opponentsUnit','status','aggroGauge','Game_BattlerBase_sparam','_provoker','Sprite_Gauge_drawValue','gbRFa','provokeLineColor','height','createProvokeHeightOrigin','BattleStatusOffsetY','needsSelection','hitType','findTgrMember','EnemyChangeAggro','members','Game_Action_applyItemUserEffect','HITTYPE_CERTAIN','MuteAnimations','keMVw','tgr','ConfigManager_makeData','leftwardAnimation','optDisplayTp','AniCertain','AvxGf','toUpperCase','traitObjects','HITTYPE_PHYSICAL','heightOrigin','log','filter','endAction','placeActorName','tgrSumFromGroup','currentValue','exit','_mirrorActorTauntAnimations','isStateAffected','AggroPerDmg','LineColor','mIMEx','createAggroGauge','_menuAggroType','oAmlE','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','OieLn','createBattleFieldAggroControl','PartsSize','Window_Options_addGeneralOptions','_statusType','VisuMZ_0_CoreEngine','14145543XuOVzM','executeHpDamageAggroControl','updateChildrenOpacity','addAggroControlSystemAggroCommand','EnemySetAggro','_muteTauntAnimations','JSON','createBattleField','xkfZq','BattleManager_invokeCounterAttack','provoke-line-color','CaIeV','itemRect','CjDkS','Parts','createStateSprite','_scene','lFNXC','_%1TauntAnimation','updateAggroControl','target','crfhm','isBypassTaunt','addChildAt','invokeCounterAttack','updateTauntAnimations','vFzID','Sprite_Gauge_currentValue','width','description','bitmap','sparam','parse','NUM','updateOpacityAggroControl','Game_Battler_onBattleStart','opacity','create','bind','initMembers','updateBattlerPositions','applyData','parameters','selectAllActors','34979VdiGFb','targetsForAlive','pqSmY','user','DvLel','ARRAYJSON','padding','bypassHighestAggro','_tauntAnimationCycle','getSpecificBattlerKeyTarget','nameY','isProvokeAffected','abs','blendMode','setup','createChildSprites','_enemies','textColor','arcHeight','ieDNo','isAggroGaugeVisible','boxWidth','initTauntAnimations','applyItemUserEffect','battleUIOffsetY','lAxbq','return\x200','Game_Action_getSpecificBattlerKeyTarget','addChild','Sprite_Battler_update','_mainSprite','shift','iconWidth','bypassProvoke','aggroMultiplier','makeData','_battleField','AddOption','zetQu','xTWnH','index','Sprite_Gauge_currentMaxValue','tauntTargetsForAlive','list','_lowestTgrMember','requestFauxAnimation','setBattler','AggroControlSystem','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isForAnyone','gaugeColor1','vGmHv','OptionName','Battle\x20Enemy\x20%1','random','vnbjc','_customModified','Game_BattlerBase_initMembers','clearTgrCache','Game_Action_applyGlobal','RsWdl','provokeOrigin','physical','mRbgK','updateOpacity','randomInt','_aggroGaugeSprite','addGeneralOptions','yGjyg','createInnerSprite','isBypassHighestAggro','actor%1-gauge-aggro','4466208cjuvMF','Battle\x20Actor\x20%1','smoothTarget','FadxY','version','magicalTauntMembers','tgrMax','convertStringToBattleTarget','length','aggro-gauge-color-1','ARRAYNUM','QdokP','Game_Action_targetsForAlive','isAggroAffected','Aggro','AnchorY','scWrK','HITTYPE_MAGICAL','battleLayoutStyle','zClet','RdPHX','isCertainHit','getColorDataFromPluginParameters','Scene_Options_maxCommands','VisuMZ_2_BattleSystemATB','_targetY','invokeMagicReflection','PriorityHighest','actor','BlendMode','BattleManager_invokeMagicReflection','_statusWindow','certainHit','addAggroControlSystemProvokeCommand','ConfigManager_applyData','aggro','maxSprites','showVisualAtbGauge','_battler','subject','updateSubPositions','pagedown','ShowFacesListStyle','ARRAYSTRUCT','Opacity'];_0x1a18=function(){return _0x15ed97;};return _0x1a18();}function Sprite_ProvokeTrail(){this['initialize'](...arguments);}Sprite_ProvokeTrail['prototype']=Object[_0x4aff1c(0xbc)](Sprite[_0x4aff1c(0x1d0)]),Sprite_ProvokeTrail[_0x4aff1c(0x1d0)][_0x4aff1c(0x1ba)]=Sprite_ProvokeTrail,Sprite_ProvokeTrail[_0x4aff1c(0x1d0)]['initialize']=function(_0x45e5be){const _0x18e7f3=_0x4aff1c;this[_0x18e7f3(0xe1)]=_0x45e5be,Sprite['prototype']['initialize'][_0x18e7f3(0x14f)](this),this['initMembers'](),this[_0x18e7f3(0xd2)]();},Sprite_ProvokeTrail[_0x4aff1c(0x1d0)][_0x4aff1c(0xbe)]=function(){const _0x313ccb=_0x4aff1c,_0x5d0a7e=VisuMZ['AggroControlSystem'][_0x313ccb(0x16f)][_0x313ccb(0x183)];this[_0x313ccb(0x160)]['x']=0.5,this[_0x313ccb(0x160)]['y']=0.5,this[_0x313ccb(0x1fd)]=0x0,this[_0x313ccb(0x1dd)]=0x0,this[_0x313ccb(0x18b)]=0x0,this['_targetY']=0x0,this[_0x313ccb(0xbb)]=0x0,this[_0x313ccb(0x1ae)]=_0x5d0a7e[_0x313ccb(0x1cf)],this[_0x313ccb(0xd0)]=_0x5d0a7e[_0x313ccb(0x128)];},Sprite_ProvokeTrail[_0x4aff1c(0x1d0)]['maxSprites']=function(){const _0xa06b8e=_0x4aff1c;return VisuMZ[_0xa06b8e(0xf2)][_0xa06b8e(0x16f)][_0xa06b8e(0x183)][_0xa06b8e(0xa5)];},Sprite_ProvokeTrail[_0x4aff1c(0x1d0)]['partsSize']=function(){const _0x3e6396=_0x4aff1c;return VisuMZ[_0x3e6396(0xf2)][_0x3e6396(0x16f)][_0x3e6396(0x183)][_0x3e6396(0x93)]/0x64;},Sprite_ProvokeTrail[_0x4aff1c(0x1d0)][_0x4aff1c(0xd2)]=function(){const _0x409f46=_0x4aff1c;this['_sprites']=[];let _0x415201=0x0;for(let _0x5b873a=0x0;_0x5b873a<=this['maxSprites']();_0x5b873a++){const _0x3b9189=new Sprite();_0x3b9189[_0x409f46(0xb5)]=ImageManager['provokeBitmap'](),_0x3b9189['anchor']['x']=0.5,_0x3b9189['anchor']['y']=0.5,_0x3b9189[_0x409f46(0x14e)]['x']=_0x3b9189['scale']['y']=this[_0x409f46(0x1ac)](),_0x3b9189[_0x409f46(0xbb)]=_0x415201,_0x3b9189[_0x409f46(0xd0)]=this[_0x409f46(0xd0)],this[_0x409f46(0xdf)](_0x3b9189),this[_0x409f46(0x1cd)][_0x409f46(0x20b)](_0x3b9189),_0x415201+=this['_opacitySpeed'];if(_0x415201>=0xff)_0x415201=0x0;}},Sprite_ProvokeTrail[_0x4aff1c(0x1d0)][_0x4aff1c(0x79)]=function(){const _0x39c577=_0x4aff1c;return this[_0x39c577(0xe1)][_0x39c577(0x1ba)]===Sprite_Actor;},Sprite_ProvokeTrail[_0x4aff1c(0x1d0)][_0x4aff1c(0x182)]=function(){const _0x3e52b7=_0x4aff1c;return SceneManager[_0x3e52b7(0xa7)][_0x3e52b7(0x16b)]['_provokeContainer'];},Sprite_ProvokeTrail[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a8)]=function(){const _0x366a48=_0x4aff1c;Sprite[_0x366a48(0x1d0)][_0x366a48(0x1a8)][_0x366a48(0x14f)](this),this[_0x366a48(0xbf)](),this[_0x366a48(0x133)](),this[_0x366a48(0x103)](),this['updateChildrenOpacity']();},Sprite_ProvokeTrail['prototype'][_0x4aff1c(0x80)]=function(){const _0x16e7e9=_0x4aff1c;return VisuMZ['AggroControlSystem']['Settings'][_0x16e7e9(0x183)][_0x16e7e9(0x17e)];},Sprite_ProvokeTrail[_0x4aff1c(0x1d0)][_0x4aff1c(0xbf)]=function(){const _0x2081af=_0x4aff1c;if(!this[_0x2081af(0xe1)][_0x2081af(0x131)])return;if(!this[_0x2081af(0xe1)]['_battler']['provoker']())return;const _0x42afb8=this['_mainSprite'][_0x2081af(0x131)][_0x2081af(0x215)]()['battler']();if(!_0x42afb8)return;const _0x38a68a=this[_0x2081af(0xe1)][_0x2081af(0x131)][_0x2081af(0x194)](),_0x50ac32=this[_0x2081af(0xe1)][_0x2081af(0x131)]['provoker']()[_0x2081af(0x194)]();this['_homeX']=this['_mainSprite']['x'],this[_0x2081af(0x1dd)]=this[_0x2081af(0xe1)]['y']-this[_0x2081af(0xe1)]['height']*_0x38a68a,this['_targetX']=_0x42afb8['x'],this['_targetY']=_0x42afb8['y']-_0x42afb8[_0x2081af(0x6b)]*_0x50ac32,this[_0x2081af(0x1fd)]+=Math[_0x2081af(0x1fc)]((Graphics[_0x2081af(0xb3)]-Graphics[_0x2081af(0xd8)])/0x2),this['_homeY']+=Math['round']((Graphics[_0x2081af(0x6b)]-Graphics[_0x2081af(0x1b3)])/0x2),this['_targetX']+=Math[_0x2081af(0x1fc)]((Graphics[_0x2081af(0xb3)]-Graphics[_0x2081af(0xd8)])/0x2),this[_0x2081af(0x124)]+=Math['round']((Graphics[_0x2081af(0x6b)]-Graphics[_0x2081af(0x1b3)])/0x2);if(!$gameSystem['isSideView']()){if(_0x42afb8[_0x2081af(0x131)][_0x2081af(0x1ca)]()){if(_0x2081af(0x11e)===_0x2081af(0x11e))visible=!![],this[_0x2081af(0x18b)]+=SceneManager[_0x2081af(0xa7)][_0x2081af(0x12a)]['x'],this['_targetY']+=SceneManager[_0x2081af(0xa7)]['_statusWindow']['y'];else return this[_0x2081af(0x131)]&&this[_0x2081af(0x95)]===_0x2081af(0x12e);}else _0x42afb8['_battler']['isEnemy']()&&(visible=!![],this[_0x2081af(0x1fd)]+=SceneManager[_0x2081af(0xa7)][_0x2081af(0x12a)]['x'],this['_homeY']+=SceneManager[_0x2081af(0xa7)]['_statusWindow']['y']);}},Sprite_ProvokeTrail[_0x4aff1c(0x1d0)][_0x4aff1c(0xd5)]=function(){const _0x2ff269=_0x4aff1c;return VisuMZ[_0x2ff269(0xf2)][_0x2ff269(0x16f)][_0x2ff269(0x183)]['ArcHeight'];},Sprite_ProvokeTrail['prototype'][_0x4aff1c(0x133)]=function(){const _0x4bd9e7=_0x4aff1c;if(!this[_0x4bd9e7(0xe1)]['_battler'])return;if(!this['_mainSprite']['_battler'][_0x4bd9e7(0x215)]())return;if(!this[_0x4bd9e7(0x1cd)])return;if(this['_sprites'][_0x4bd9e7(0x113)]<=0x0)return;const _0x5d742d=(this['_targetX']-this['_homeX'])/this[_0x4bd9e7(0x12f)](),_0x4fd2f5=(this[_0x4bd9e7(0x124)]-this[_0x4bd9e7(0x1dd)])/this['maxSprites']();for(let _0x1e5223=0x0;_0x1e5223<=this['maxSprites']();_0x1e5223++){if('wqQhW'==='wqQhW'){const _0x216b5f=this['_sprites'][_0x1e5223];if(!_0x216b5f)continue;_0x216b5f['x']=this['_homeX']+_0x5d742d*_0x1e5223;const _0x51902c=this[_0x4bd9e7(0x12f)]()-_0x1e5223,_0x2ec307=this[_0x4bd9e7(0x12f)]()/0x2,_0x3d510d=this[_0x4bd9e7(0xd5)](),_0xb6a61e=-_0x3d510d/Math[_0x4bd9e7(0x154)](_0x2ec307,0x2),_0x4486cb=_0xb6a61e*Math[_0x4bd9e7(0x154)](_0x51902c-_0x2ec307,0x2)+_0x3d510d;_0x216b5f['y']=this['_homeY']+_0x4fd2f5*_0x1e5223-_0x4486cb;}else return this[_0x4bd9e7(0x210)]()?this[_0x4bd9e7(0x1ed)]():_0x45a18a['AggroControlSystem'][_0x4bd9e7(0xec)][_0x4bd9e7(0x14f)](this);}},Sprite_ProvokeTrail[_0x4aff1c(0x1d0)][_0x4aff1c(0x1b2)]=function(){const _0x2c114c=_0x4aff1c;return VisuMZ[_0x2c114c(0xf2)][_0x2c114c(0x16f)][_0x2c114c(0x183)]['Opacity'];},Sprite_ProvokeTrail[_0x4aff1c(0x1d0)]['updateOpacity']=function(){const _0x3ec672=_0x4aff1c,_0x4da935=this['_mainSprite'][_0x3ec672(0x131)];if(!_0x4da935)this[_0x3ec672(0xbb)]=0x0;else{if(_0x4da935[_0x3ec672(0x14c)]()&&_0x4da935[_0x3ec672(0x215)]()){if(_0x3ec672(0x8f)===_0x3ec672(0x8f))this[_0x3ec672(0xbb)]=0xff;else{const _0x3bda56=_0x4e49fc[_0x3ec672(0x10d)](this[_0x3ec672(0x167)]);return _0x3bda56[_0x3ec672(0x1e4)](this['item']()[_0x3ec672(0x6f)])?[_0x3bda56]:[_0x1940e2[_0x3ec672(0x214)]()];}}else this[_0x3ec672(0xbb)]=0x0;}},Sprite_ProvokeTrail[_0x4aff1c(0x1d0)][_0x4aff1c(0x99)]=function(){const _0x33e756=_0x4aff1c;if(!this[_0x33e756(0xe1)]['_battler'])return;if(!this[_0x33e756(0xe1)]['_battler'][_0x33e756(0x215)]())return;if(!this[_0x33e756(0x1cd)])return;if(this[_0x33e756(0x1cd)]['length']<=0x0)return;for(let _0xee7e32=0x0;_0xee7e32<=this[_0x33e756(0x12f)]();_0xee7e32++){const _0xef9876=this[_0x33e756(0x1cd)][this[_0x33e756(0x79)]()?this[_0x33e756(0x12f)]()-_0xee7e32:_0xee7e32];if(!_0xef9876)continue;_0xef9876[_0x33e756(0xbb)]-=this[_0x33e756(0x1ae)];if(_0xef9876[_0x33e756(0xbb)]<=0x0)_0xef9876['opacity']=0xff;}},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x174)]=Spriteset_Battle['prototype'][_0x4aff1c(0x9e)],Spriteset_Battle[_0x4aff1c(0x1d0)][_0x4aff1c(0x9e)]=function(){const _0x2824b8=_0x4aff1c;VisuMZ[_0x2824b8(0xf2)][_0x2824b8(0x174)][_0x2824b8(0x14f)](this),this[_0x2824b8(0x92)]();},Spriteset_Battle[_0x4aff1c(0x1d0)]['createBattleFieldAggroControl']=function(){const _0x5a5977=_0x4aff1c;if(!Imported['VisuMZ_1_BattleCore'])return;const _0x3a0f57=this['_battleField']['x'],_0x42457f=this[_0x5a5977(0xe7)]['y'],_0x159f0b=this[_0x5a5977(0xe7)][_0x5a5977(0xb3)],_0x2031ec=this[_0x5a5977(0xe7)][_0x5a5977(0x6b)];this[_0x5a5977(0x1c3)]=new Sprite(),this[_0x5a5977(0x1c3)][_0x5a5977(0x1d1)](0x0,0x0,_0x159f0b,_0x2031ec),this[_0x5a5977(0x1c3)]['x']=_0x3a0f57,this[_0x5a5977(0x1c3)]['y']=_0x42457f;if(Imported[_0x5a5977(0x189)]){if(_0x5a5977(0xc7)!==_0x5a5977(0x9f)){const _0x29cd82=this[_0x5a5977(0x159)][_0x5a5977(0x1c0)](this['_damageContainer']);this[_0x5a5977(0xae)](this[_0x5a5977(0x1c3)],_0x29cd82);}else return this[_0x5a5977(0x217)]()[_0x5a5977(0x1a0)]();}else this[_0x5a5977(0xdf)](this[_0x5a5977(0x1c3)]);},VisuMZ[_0x4aff1c(0xf2)]['Spriteset_Battle_update']=Spriteset_Battle[_0x4aff1c(0x1d0)]['update'],Spriteset_Battle[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a8)]=function(){const _0xc9f34a=_0x4aff1c;VisuMZ[_0xc9f34a(0xf2)]['Spriteset_Battle_update'][_0xc9f34a(0x14f)](this),this[_0xc9f34a(0xaa)]();},Spriteset_Battle['prototype'][_0x4aff1c(0xaa)]=function(){const _0x444f9e=_0x4aff1c;if(!this['_provokeContainer'])return;if(!this[_0x444f9e(0x188)])return;this['_provokeContainer']['x']=this[_0x444f9e(0x188)]['x'],this['_provokeContainer']['y']=this[_0x444f9e(0x188)]['y'];},VisuMZ[_0x4aff1c(0xf2)][_0x4aff1c(0x205)]=Window_BattleEnemy[_0x4aff1c(0x1d0)][_0x4aff1c(0x1d5)],Window_BattleEnemy[_0x4aff1c(0x1d0)][_0x4aff1c(0x1d5)]=function(){const _0xd82b64=_0x4aff1c;if(this[_0xd82b64(0x178)]())'PmTkS'!==_0xd82b64(0x169)?(Imported[_0xd82b64(0x189)]&&this[_0xd82b64(0x14d)](),Window_Selectable[_0xd82b64(0x1d0)][_0xd82b64(0x1d5)][_0xd82b64(0x14f)](this)):_0x4bccb0+=_0x4c87c9[_0xd82b64(0xe3)];else{if(this[_0xd82b64(0x1e8)]())Imported[_0xd82b64(0x189)]&&this['sortEnemies'](),Window_Selectable['prototype']['refresh'][_0xd82b64(0x14f)](this);else{if(_0xd82b64(0x1fb)!==_0xd82b64(0x1fb))return![];else VisuMZ['AggroControlSystem']['Window_BattleEnemy_refresh'][_0xd82b64(0x14f)](this);}}},Window_BattleEnemy[_0x4aff1c(0x1d0)]['applyProvokeFilters']=function(){const _0x4d5c9a=_0x4aff1c,_0x56b77=BattleManager[_0x4d5c9a(0x200)](),_0xbfb079=BattleManager[_0x4d5c9a(0x127)]();if(!_0x56b77)return![];if(!_0xbfb079)return![];if(DataManager['isBypassProvoke'](_0x56b77[_0x4d5c9a(0x199)]()))return![];if(_0xbfb079[_0x4d5c9a(0xe4)]())return![];if(!_0x56b77[_0x4d5c9a(0xce)]())return![];if(_0xbfb079[_0x4d5c9a(0xce)]()){if(_0x4d5c9a(0xc5)==='GEnwr')return _0x74e8be[_0x4d5c9a(0xf2)][_0x4d5c9a(0x16f)][_0x4d5c9a(0x183)][_0x4d5c9a(0x1f0)];else{this[_0x4d5c9a(0xd3)]=[_0xbfb079[_0x4d5c9a(0x215)]()];if(_0x56b77[_0x4d5c9a(0xf4)]&&_0x56b77[_0x4d5c9a(0xf4)]()){const _0x4692f1=$gameParty[_0x4d5c9a(0x184)]();this[_0x4d5c9a(0xd3)]=this['_enemies'][_0x4d5c9a(0x1b5)](_0x4692f1),_0x56b77[_0x4d5c9a(0x171)]&&_0x56b77[_0x4d5c9a(0x171)]()&&_0x4692f1['length']>0x1&&this[_0x4d5c9a(0x193)](_0x4d5c9a(0x134),this[_0x4d5c9a(0xc2)][_0x4d5c9a(0xbd)](this));}return!![];}}else return![];},Window_BattleEnemy[_0x4aff1c(0x1d0)]['applyTauntFilters']=function(){const _0x3ea53a=_0x4aff1c,_0x527a05=BattleManager[_0x3ea53a(0x200)](),_0x23b5bb=BattleManager[_0x3ea53a(0x127)](),_0xeceec7=$gameTroop;if(!_0x527a05)return![];if(!_0x23b5bb)return![];if(!_0x527a05['item']())return![];if(DataManager[_0x3ea53a(0xad)](_0x527a05['item']()))return![];if(_0x23b5bb[_0x3ea53a(0x1c8)]())return![];if(!_0x527a05[_0x3ea53a(0x208)]())return![];if(_0x527a05['isPhysical']()&&_0xeceec7['physicalTauntMembers']()[_0x3ea53a(0x113)]>0x0)this[_0x3ea53a(0xd3)]=_0xeceec7[_0x3ea53a(0x18a)]();else{if(_0x527a05['isMagical']()&&_0xeceec7[_0x3ea53a(0x110)]()['length']>0x0){if(_0x3ea53a(0xa2)!==_0x3ea53a(0xa2))return _0x6f4fe1+_0x2b6c61(_0xa13efd['$1'])/0x64;else this['_enemies']=_0xeceec7[_0x3ea53a(0x110)]();}else{if(_0x527a05[_0x3ea53a(0x120)]()&&_0xeceec7['certainHitTauntMembers']()[_0x3ea53a(0x113)]>0x0)_0x3ea53a(0x1c1)===_0x3ea53a(0x1e9)?this[_0x3ea53a(0x193)]('pagedown',this[_0x3ea53a(0xc2)][_0x3ea53a(0xbd)](this)):this[_0x3ea53a(0xd3)]=_0xeceec7[_0x3ea53a(0x14b)]();else return![];}}if(_0x527a05[_0x3ea53a(0xf4)]&&_0x527a05[_0x3ea53a(0xf4)]()){if('yGjyg'===_0x3ea53a(0x107)){const _0x5692d5=$gameParty[_0x3ea53a(0x184)]();this[_0x3ea53a(0xd3)]=this[_0x3ea53a(0xd3)][_0x3ea53a(0x1b5)](_0x5692d5),_0x527a05[_0x3ea53a(0x171)]&&_0x527a05[_0x3ea53a(0x171)]()&&_0x5692d5['length']>0x1&&this[_0x3ea53a(0x193)](_0x3ea53a(0x134),this[_0x3ea53a(0xc2)][_0x3ea53a(0xbd)](this));}else return this[_0x3ea53a(0x150)]();}return!![];},VisuMZ['AggroControlSystem'][_0x4aff1c(0x94)]=Window_Options[_0x4aff1c(0x1d0)][_0x4aff1c(0x106)],Window_Options[_0x4aff1c(0x1d0)][_0x4aff1c(0x106)]=function(){const _0x1874ea=_0x4aff1c;VisuMZ[_0x1874ea(0xf2)][_0x1874ea(0x94)]['call'](this),this[_0x1874ea(0x1e6)]();},Window_Options['prototype'][_0x4aff1c(0x1e6)]=function(){const _0x3fd196=_0x4aff1c;VisuMZ[_0x3fd196(0xf2)][_0x3fd196(0x16f)][_0x3fd196(0x183)][_0x3fd196(0xe8)]&&this[_0x3fd196(0x12c)]();if(VisuMZ[_0x3fd196(0xf2)][_0x3fd196(0x16f)][_0x3fd196(0x119)][_0x3fd196(0xe8)]){if(_0x3fd196(0x1ec)===_0x3fd196(0x1ec))this[_0x3fd196(0x9a)]();else{if(!_0x78f00e)return null;if(_0x118be8[_0x3fd196(0x17b)](/BATTLE ACTOR (\d+)/i))return _0x6513bd[_0x3fd196(0x127)](_0x1aa0d2(_0x222096['$1']));else{if(_0x5b12cb[_0x3fd196(0x17b)](/BATTLE ENEMY (\d+)/i))return _0x466015['members']()[_0x47d6f3(_0x37e44e['$1'])];}return null;}}},Window_Options[_0x4aff1c(0x1d0)][_0x4aff1c(0x12c)]=function(){const _0x55f81b=_0x4aff1c,_0x12f8bb=TextManager[_0x55f81b(0x100)],_0x43b4ca=_0x55f81b(0x100);this[_0x55f81b(0x146)](_0x12f8bb,_0x43b4ca);},Window_Options[_0x4aff1c(0x1d0)][_0x4aff1c(0x9a)]=function(){const _0x1d2587=_0x4aff1c,_0x577ee6=TextManager[_0x1d2587(0x219)],_0x1d2e79=_0x1d2587(0x219);this['addCommand'](_0x577ee6,_0x1d2e79);},VisuMZ[_0x4aff1c(0xf2)]['Window_StatusBase_placeActorName']=Window_StatusBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x84)],Window_StatusBase[_0x4aff1c(0x1d0)]['placeActorName']=function(_0x5e53a3,_0x32e9cd,_0x4a7605){const _0x325ff7=_0x4aff1c;if(this[_0x325ff7(0x177)]())this[_0x325ff7(0x1a1)](_0x5e53a3[_0x325ff7(0xeb)]());VisuMZ['AggroControlSystem']['Window_StatusBase_placeActorName'][_0x325ff7(0x14f)](this,_0x5e53a3,_0x32e9cd,_0x4a7605);},Window_StatusBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x177)]=function(){const _0x5b4094=_0x4aff1c;if(![Window_BattleActor,Window_BattleStatus][_0x5b4094(0x1d7)](this[_0x5b4094(0x1ba)]))return![];if(!SceneManager[_0x5b4094(0x203)]())return![];return ConfigManager['aggroGauge']&&VisuMZ[_0x5b4094(0xf2)][_0x5b4094(0x16f)][_0x5b4094(0x119)][_0x5b4094(0x17c)];},Window_StatusBase[_0x4aff1c(0x1d0)][_0x4aff1c(0x1e0)]=function(_0x43f202,_0x465528,_0x36a90f){this['placeGauge'](_0x43f202,'aggro',_0x465528,_0x36a90f);},Window_BattleStatus[_0x4aff1c(0x1d0)][_0x4aff1c(0x1a1)]=function(_0x334350){const _0x293502=_0x4aff1c,_0x5b12ef=this[_0x293502(0x127)](_0x334350),_0x16dd5c=this[_0x293502(0x206)](_0x334350),_0x140b50=this[_0x293502(0x161)](_0x334350),_0x4811fe=_0x293502(0x10a)[_0x293502(0x204)](_0x5b12ef[_0x293502(0x143)]()),_0x2604a7=this[_0x293502(0x108)](_0x4811fe,Sprite_Gauge),_0x5ccd14=VisuMZ[_0x293502(0xf2)][_0x293502(0x16f)][_0x293502(0x119)];_0x2604a7['x']=_0x16dd5c+(_0x5ccd14[_0x293502(0x15c)]||0x0),_0x2604a7['y']=_0x140b50+(_0x5ccd14[_0x293502(0x6d)]||0x0),_0x2604a7['_menuAggroType']=!![],_0x2604a7[_0x293502(0xd1)](_0x5b12ef,_0x293502(0x12e)),_0x2604a7[_0x293502(0x1df)]=!![];},Window_BattleStatus[_0x4aff1c(0x1d0)][_0x4aff1c(0x206)]=function(_0x233a4b){const _0xa45846=_0x4aff1c;let _0x343e54=this['itemRectWithPadding'](_0x233a4b),_0x16dee0=this[_0xa45846(0x213)](_0x343e54);if(Imported[_0xa45846(0x189)]){let _0x19c843=this['itemRect'](_0x233a4b);if(this[_0xa45846(0x11d)]()==='list'){const _0x3e0243=$dataSystem[_0xa45846(0x7a)]?0x4:0x3,_0x1b0695=_0x3e0243*0x80+(_0x3e0243-0x1)*0x8+0x4,_0x3d22a2=this['actor'](_0x233a4b);let _0x56178e=_0x19c843['x']+this[_0xa45846(0xc9)];if(VisuMZ['BattleCore'][_0xa45846(0x16f)]['BattleLayout'][_0xa45846(0x135)])_0x56178e=_0x19c843['x']+ImageManager[_0xa45846(0x139)]+0x8;else{if('bioEV'===_0xa45846(0xdc))return this['traitObjects']()[_0xa45846(0x18c)](_0x1f1d5e=>_0x1f1d5e&&_0x1f1d5e[_0xa45846(0x1bf)]['match'](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));else _0x56178e+=ImageManager[_0xa45846(0xe3)];}_0x16dee0=Math['round'](Math[_0xa45846(0x15b)](_0x19c843['x']+_0x19c843['width']-_0x1b0695,_0x56178e)),_0x16dee0-=0x4;}else _0x16dee0=Math['round'](_0x19c843['x']+(_0x19c843[_0xa45846(0xb3)]-0x80)/0x2);}return _0x16dee0;},Window_BattleStatus[_0x4aff1c(0x1d0)][_0x4aff1c(0x161)]=function(_0x50ab26){const _0xaa4840=_0x4aff1c,_0x57426d=this[_0xaa4840(0xa3)](_0x50ab26);let _0x5d14f9=this[_0xaa4840(0xcd)](_0x57426d);if(Imported[_0xaa4840(0x189)]){if(_0xaa4840(0x1f4)!=='RLxPo'){let _0x404da4=this[_0xaa4840(0xcb)][_0xaa4840(0x113)];while(_0x404da4){const _0x3c3712=this[_0xaa4840(0xcb)][_0xaa4840(0xe2)]();this[_0xaa4840(0xcb)][_0xaa4840(0x20b)](_0x3c3712);const _0x113608=_0xaa4840(0x1a6)['format'](_0x3c3712);if(this[_0xaa4840(0x131)][_0x113608]()){const _0x25be0b=_0xaa4840(0xa9)[_0xaa4840(0x204)](_0x3c3712),_0x1d0588=_0x3b9dbd[_0x25be0b];if(_0x1d0588)return _0x1d0588;}_0x404da4--;}return _0x129e9d[_0xaa4840(0x186)];}else{if(this[_0xaa4840(0x11d)]()===_0xaa4840(0xee)){if('JeFrg'!==_0xaa4840(0x1c7)){let _0x340614=this[_0xaa4840(0xa3)](_0x50ab26);_0x5d14f9=Math['round'](_0x340614['y']+(_0x340614[_0xaa4840(0x6b)]-Sprite_Name[_0xaa4840(0x1d0)][_0xaa4840(0x1c4)]())/0x2);}else return this[_0xaa4840(0x187)]()||this[_0xaa4840(0x19a)]()||this[_0xaa4840(0x1d2)]();}}}if(this[_0xaa4840(0x155)]())_0x5d14f9-=Sprite_Gauge[_0xaa4840(0x1d0)][_0xaa4840(0x13a)]()-0x1;return _0x5d14f9;},Window_BattleStatus['prototype']['isAtbGaugeVisible']=function(){const _0x1aec58=_0x4aff1c;if(!BattleManager[_0x1aec58(0x17a)]())return![];if(Imported[_0x1aec58(0x123)])return this[_0x1aec58(0x130)](_0x1aec58(0x19f));return!![];};